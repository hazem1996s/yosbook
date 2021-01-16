import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class ExamsResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let quizType = route.data.quizType;
      this.firebaseService.get_collection(quizType)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
