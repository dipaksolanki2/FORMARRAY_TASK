import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = new Router(); 
  const isLoggedIn = authService.isLoggedIn();

  const snackBar = inject(MatSnackBar)

  if(isLoggedIn){
    return true;
  } 
  
  else{
    // console.log("User is not logged in")
    ;(function openSnackBar() {
      snackBar.open('User is not logged in', 'close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })();
    router.navigate(['/login'])
    return false;
  }
  
};




