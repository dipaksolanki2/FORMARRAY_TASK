import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  backendUrl: string = 'http://localhost:3000'

  onSignUp(formData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/signup`, formData);
  }

  onLogin(formData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/login`, formData);
  }

  onLogout(): Observable<any> {
    localStorage.removeItem('token')
    localStorage.removeItem('expires_at') 
    return this.http.get<any>(`${this.backendUrl}/logout`);
  }


  isLoggedIn():boolean{

    if(localStorage.getItem('token') == 'undefined') {
      return false;
    }
    else {
      return !!localStorage.getItem('token');
    }
    
  }

 
}
