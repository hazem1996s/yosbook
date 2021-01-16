import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-un-public-d',
  templateUrl: './un-public-d.component.html',
  styleUrls: ['./un-public-d.component.scss']
})
export class UnPublicDComponent implements OnInit {

  public : any;
  id: any;
  constructor(public router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.public = data.payload.data();
        this.id = data.payload.id;
      }
    })
  }

}
