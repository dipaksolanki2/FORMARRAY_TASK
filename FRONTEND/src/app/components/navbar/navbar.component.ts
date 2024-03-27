import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // console.log(this.isLoggedIn);
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.isLoggedIn = false
    this.authService.onLogout()
    this.router.navigate(['/login']);
  }
  
}
