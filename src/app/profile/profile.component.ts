import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, Subject, Observer } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { userData } from '../shared/userData';
import { MatSnackBar } from '@angular/material/snack-bar';

import arabic from '@angular/common/locales/ar';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'D/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM Y',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM Y'
  },
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'tr' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS ]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ProfileComponent implements OnInit {
  user: any;
  id: any;
  email: string;
  dateBirth: string;
  date = (new Date()).toISOString();


  profileForm: FormGroup;
  profile: userData;
  exams: any;
  files: File[] = [];
  file: File;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;


  @ViewChild('fform') profileFormDirective;

  formErrors = {
    'name': '',
    'phone': ''
  };

  
  validationMessages = {
    'name': {
      'required': 'الاسم مطلوب',
    },
    'phone': {
      'required': 'رقم الهاتف مطلوب',
      'pattern': 'يجب ان يحتوي رقم الهاتف على أرقام فقط'
    }
  };


  constructor( 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    public snackBar: MatSnackBar,
    public router: Router,
    private storage: AngularFireStorage,
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data.payload.data();
        this.id = data.payload.id;
        this.email = this.user.email;
        if(this.user.image) {
          this.downloadURL = this.user.image;
        }
        else if (!this.user.image) {
          this.downloadURL = 'assets/male-user.png';
        } 
      }
    })
    this.firebaseService.get_user_exams(this.id).subscribe((result) => {
      this.exams= result;
    })
    this.createForm();
    
  }

  createForm() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern]],
      sex: '',
      dateBirth: '',
      address: '',
      nationality: '',
      education: ''
    });

    this.profileForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages 
  }

  onValueChanged(data?: any) {
    if (!this.profileForm) {
      return;
    }
    const form = this.profileForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous erroe message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.file = this.files[i];
      this.startUpload(this.file);
    }
  }

  startUpload(file) {
    const path = `test/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.files = [];
      }),
    );
  }


  onSubmit() {
    const formData = {
      ...this.profileForm.value,
      email: this.email,
      image: this.downloadURL,
      dateBirth: (new Date(this.profileForm.value.dateBirth)).toISOString(),
      updatedAt: this.date
    };
    this.profile = formData;
    console.log(this.profile)
    this.firebaseService.update_user('users', this.id, this.profile)
    .then(
      res => {
        this.openSnackBar("Profiliniz Başarıyla Güncellendi", '🙂')
        setTimeout(() => { this.router.navigate(['/']); }, 3000);
      }
    )
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: 'left'
    });
  }

}
