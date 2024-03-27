import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = new Router(); 
  const isLoggedIn = authService.isLoggedIn();

  if(isLoggedIn){
    return true;
  } 
  
  else{
    console.log("User is not logged in")
    router.navigate(['/login'])
    return false;
  }
  
};




