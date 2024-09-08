import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';

@Component({
  selector: 'app-provider-layout',
  templateUrl: './provider-layout.component.html',
  styleUrl: './provider-layout.component.css'
})
export class ProviderLayoutComponent {

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
