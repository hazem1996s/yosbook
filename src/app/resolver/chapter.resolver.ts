import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class ChapterResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let chapterId = route.paramMap.get('chapterId');
      let quizType = route.data.quizType;
      this.firebaseService.get_document(quizType, chapterId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
