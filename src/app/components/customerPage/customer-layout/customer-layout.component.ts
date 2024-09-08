import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

  constructor(private route:Router,private loginService:LoginserviceService){}
  callSignOut(){
    localStorage.clear();
    this.route.navigate(['/home']);
  }

  userLoggedIn:any="";

  ngOnInit(): void {
    const userName = this.loginService.haveAccess().UserName;
    this.userLoggedIn = userName;
  }
}
