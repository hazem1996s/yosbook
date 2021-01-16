import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Group } from '../shared/group';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  results: any;
  constructor(
    private firebaseService: FirebaseService,
    public snackBar: MatSnackBar,
    public router: Router,
    private titleService: Title) {
    this.titleService.setTitle("YÖS BOOK - Articals");
  }

  ngOnInit(): void {

    this.firebaseService.get_articals()
    .subscribe(result => {
      this.results = result;
    })
  }
  

}
