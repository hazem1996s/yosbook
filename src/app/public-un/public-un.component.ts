import { Component, OnInit, ViewChild } from '@angular/core';
import { Public_Uni } from '../shared/public_university';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-public-un',
  templateUrl: './public-un.component.html',
  styleUrls: ['./public-un.component.scss']
})
export class PublicUnComponent implements OnInit {

  results: Array<any>;
  searchText;
  searchForm: FormGroup;
  passcode;
  universities: Public_Uni[] = [];
  spinner: boolean = true;
  password: string = '001002003';
  showTable: boolean = true;
  loadMore: boolean = true;
  searchDone: boolean = false;
  wrongSearch: boolean = false;
  lastDocument: any;

  @ViewChild('fform') searchFormDirective;

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
    public db: AngularFirestore,
    private fb: FormBuilder,
    ) {
    }

  ngOnInit(): void {
    this.getSome_Data()
    this.createForm()
  }

  createForm() {
    this.searchForm = this.fb.group({
      searchType: ['', [Validators.required]],
      searchValue: ['', [Validators.required]],
    });

    this.searchForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages 
  }

  onValueChanged(data?: any) {
    if (!this.searchForm) {
      return;
    }
    const form = this.searchForm;
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

  getFilteredData(value) {
    this.universities = [];
    this.db.firestore.collection("public").where(value.searchType, "==", true).get()
    .then((querySnapshot: any) => {
      if(querySnapshot.docs.length == 0) {
        this.wrongSearch = true;
        console.log(this.wrongSearch)
      }
      else {
        for(var i in querySnapshot.docs) {
          this.universities[i] = querySnapshot.docs[i].data();
          this.universities[i].id = querySnapshot.docs[i].id;
        }
        this.searchDone = true;
        this.wrongSearch = false;
      }

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  getSome_Data() {
    this.universities = [];
    var first = this.db.firestore.collection("public").limit(12);
    first.get().then((documentSnapshots: any) => {
      this.lastDocument = documentSnapshots.docs[documentSnapshots.docs.length-1];
      console.log(documentSnapshots.docs.length-1)
      for(var i in documentSnapshots.docs) {
        this.universities[i] = documentSnapshots.docs[i].data();
        this.universities[i].id = documentSnapshots.docs[i].id;
      }
      this.spinner = false;
      this.searchDone = false;
      this.loadMore = true;
    });
  }

  getAllData() {
    var last = this.db.firestore.collection("public").startAfter(this.lastDocument);
    last.get().then((documentSnapshots: any) => {
      this.loadMore = false;
      console.log("member length ", this.universities.length)
      console.log("member rest ", documentSnapshots.docs.length)
      const memberLength = this.universities.length + documentSnapshots.docs.length;
      console.log(memberLength)
      var j = 0;
      for(let i = this.universities.length; i < memberLength; i++) {
        this.universities[i] = documentSnapshots.docs[j].data();
        this.universities[i].id = documentSnapshots.docs[j].id;
        j++;
      }
    });
  }

  cancelFilter() {
    this.searchDone = false;
  }

  onSubmit() {
    const formData = {
      searchType: this.searchForm.value.searchType,
      searchValue: this.searchForm.value.searchValue,
    };
    this.getFilteredData(formData)
  }

  calculateDiff(dateSent){
    if(dateSent == null) {
      return 'khara';
    }
    else {
      let currentDate = new Date();
      dateSent = new Date(dateSent);
      if (Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24)) < 0) {
        return 'inactive';
      }
      else if (Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24)) < 6) {
        return '5_days';
      }
      else if (Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24)) >= 6) {
        return 'Active';
      }
      else {
        return 'inactive';
      }
    }
  }

}
