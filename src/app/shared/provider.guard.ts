import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../services/loginservices/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderGuard implements CanActivate {

  constructor(private loginService: LoginserviceService, private router: Router) {}

  canActivate(): boolean {
    const role = this.loginService.haveAccess();
    console.log('ProviderGuard role:', role);
    
    if (role.toLowerCase() === 'provider') { 
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
