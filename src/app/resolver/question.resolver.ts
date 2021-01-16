import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class QuestionResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let examId = route.paramMap.get('id');
      let questionId = route.paramMap.get('questionId');
      
      this.firebaseService.get_question(examId, questionId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
