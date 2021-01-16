import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authServices: AuthService) { }
  @HostListener('window:scroll', ['$event'])


  ngOnInit(): void {
  }

  signOut() {
    this.authServices.SignOut();
    this.ngOnInit();
  }
  
}
