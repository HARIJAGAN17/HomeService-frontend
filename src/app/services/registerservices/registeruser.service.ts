import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { register } from '../../model/register';
import { response } from '../../model/response';

@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  constructor(private http:HttpClient) { }

  baseUrl:string="http://localhost:5065/api/Auth"
  RegisterUser(registerData:register,userRole:string):Observable<response>{
    userRole = userRole.toLowerCase();
    if(userRole=='customer'){
      console.log("customer api")
      return this.http.post<response>(`${this.baseUrl}/register-customer`,registerData);
    }
    // else if(userRole=='admin'){
    //  // console.log("admin api");
    // // return this.http.post<response>(`${this.baseUrl}/register-admin`,registerData);
    // }
    console.log("provider api")
    return this.http.post<response>(`${this.baseUrl}/register-provider`,registerData);
    
  
  }
}
