import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../../model/login';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:string='';
  password:string='';


  constructor(private router: Router,private loginService:LoginserviceService) { }

  loginData:Login = {userName:'',password:''};
  
  onSubmit():void {
    this.loginData.userName = this.username;
    this.loginData.password = this.password;
    this.loginService.getToken(this.loginData).subscribe({
      next:(data:any)=>{
        console.log(data);
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        console.log("completed successfully");
      }
    })


    this.router.navigate(['/provider']);
  }


}
