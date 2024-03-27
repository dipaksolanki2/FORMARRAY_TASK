import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  backendUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  saveStudents(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/students`, studentData)
  }

  getStudents(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/students`);
  }

  editStudent(studentId: any, studentData: any): Observable<any> {
    return this.http.put<any>(`${this.backendUrl}/students/${studentId}`, studentData);
  }

  deleteStudent(studentId: any): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/students/${studentId}`);
  }

  deleteStudentonly(studentId: any): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/student/${studentId}`);
  }


}
