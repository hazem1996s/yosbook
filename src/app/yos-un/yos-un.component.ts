import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Public_University } from '../public_university';
import { Public_Uni } from '../shared/public_university';

@Component({
  selector: 'app-yos-un',
  templateUrl: './yos-un.component.html',
  styleUrls: ['./yos-un.component.scss']
})
export class YosUnComponent implements OnInit {

  spinner: boolean = true;
  universities: Public_Uni[] = [];
  searchText;

  constructor(
    private route: ActivatedRoute,
    public db: AngularFirestore,) { }

  ngOnInit(): void {
    this.getSome_Data();
  }

  getSome_Data() {
    this.universities = [];
    var first = this.db.firestore.collection("yos");
    first.get().then((documentSnapshots: any) => {
      // this.lastDocument = documentSnapshots.docs[documentSnapshots.docs.length-1];
      // console.log(documentSnapshots.docs.length-1)
      for(var i in documentSnapshots.docs) {
        this.universities[i] = documentSnapshots.docs[i].data();
        this.universities[i].id = documentSnapshots.docs[i].id;
      }
      this.spinner = false;
      // this.searchDone = false;
      // this.loadMore = true;
    });
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
