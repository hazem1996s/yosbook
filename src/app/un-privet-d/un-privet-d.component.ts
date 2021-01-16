import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-un-privet-d',
  templateUrl: './un-privet-d.component.html',
  styleUrls: ['./un-privet-d.component.scss']
})
export class UnPrivetDComponent implements OnInit {

  
  private : any;
  id: any;
  constructor(public router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.private = data.payload.data();
        this.id = data.payload.id;
      }
    })
  }

}
