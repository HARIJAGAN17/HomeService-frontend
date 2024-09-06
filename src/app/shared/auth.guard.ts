import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../services/loginservices/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService:LoginserviceService,private router: Router) {}

  canActivate() {
    // Implement your authentication logic here
    if(this.loginService.isLoggedIn()){
      this.loginService.haveAccess();
      return true;
    }
   else{
    this.router.navigate(['/home/login'])
    return false;
   }
  }
}
