import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  bseUrl:string="http://localhost:5065/api/Auth/login"
  constructor(private http:HttpClient) {

   }

   getToken(loginData:Login):Observable<any>{
    return this.http.post<any>(this.bseUrl,loginData);
   }

   isLoggedIn(){
    return localStorage.getItem('token')!=null;
   }
}
