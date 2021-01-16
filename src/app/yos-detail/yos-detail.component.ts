import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-yos-detail',
  templateUrl: './yos-detail.component.html',
  styleUrls: ['./yos-detail.component.scss']
})
export class YosDetailComponent implements OnInit {

  yos : any;
  id: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.yos = data.payload.data();
        this.id = data.payload.id;
      }
    })
  }

}
