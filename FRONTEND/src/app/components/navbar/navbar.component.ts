import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  token = localStorage.getItem('token')
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    
  }


  logout() {
    this.isLoggedIn = false
    this.authService.onLogout()
    this.snackBar.open("User logged out", "close", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000,
    })
    this.router.navigate(['/login']);
  }
    
}
