import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../services/loginservices/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private loginService: LoginserviceService, private router: Router) {}

  canActivate(): boolean {
    const role = this.loginService.haveAccess();
    console.log('CustomerGuard role:', role);
    
    if (role.toLowerCase() === 'customer') {
      return true;
    } else {
      this.router.navigate(['/noauth']);
      return false;
    }
  }
}
