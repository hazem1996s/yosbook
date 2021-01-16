import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artical',
  templateUrl: './artical.component.html',
  styleUrls: ['./artical.component.scss']
})
export class ArticalComponent implements OnInit {

  constructor(    public router: Router,
    private route: ActivatedRoute,) { }

    artical: any;

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.artical = data.payload.data();
        }
    })

  }

}
