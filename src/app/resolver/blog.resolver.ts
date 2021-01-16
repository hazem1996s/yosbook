import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class BlogResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let blogId = route.paramMap.get('id');
      this.firebaseService.get_document('blogs', blogId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
