import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class PublicResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let universityId = route.paramMap.get('id');
      this.firebaseService.get_document('public', universityId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
