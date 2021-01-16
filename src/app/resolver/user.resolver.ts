import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class UserResolver implements Resolve<any> {

    constructor(public firebaseService: FirebaseService) { }

    resolve(route: ActivatedRouteSnapshot,) {
        return new Promise((resolve, reject) => {
            let userId = JSON.parse(localStorage.getItem('user')).uid;
            this.firebaseService.get_user(userId)
            .subscribe(
                data => {
                    resolve(data);
                }
            );
        })
    }
}
