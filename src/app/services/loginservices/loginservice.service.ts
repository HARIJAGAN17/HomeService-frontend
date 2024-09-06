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

   fetchTokenValue(){
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
   }

   haveAccess(){
    
    var logginToken = localStorage.getItem("token");

    if (logginToken) {
        var _extractedToken = logginToken.split(".")[1];

        try {
            var _atobData = atob(_extractedToken);
            var _finalData = JSON.parse(_atobData);
            console.log(_finalData);
            return _finalData.UserRole;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    } else {
        console.error("No token found in localStorage.");
        return null;
    }
}

}
