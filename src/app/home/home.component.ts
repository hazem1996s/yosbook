import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Group } from '../shared/group';
import { News } from '../shared/news';
declare var jarallax: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  statement = false;
  groupForm: FormGroup;
  group: Group;

  
  results: any;
  news: News[] = [];

  groups: any;

  @ViewChild('fform') groupFormDirective;


  constructor(    
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    public snackBar: MatSnackBar,
    public router: Router,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.firebaseService.get_collection('news')
    .subscribe(result => {
      this.results = result;
      for(let i = 0; i < result.length; i++) {
        this.news[i] = this.results[i].payload.doc.data();
        this.news[i].id = this.results[i].payload.doc.id;
      }
      
    })

  }



}
