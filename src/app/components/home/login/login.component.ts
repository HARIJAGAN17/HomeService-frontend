import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../model/login';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginform:FormGroup;

  constructor(private router: Router,private loginService:LoginserviceService,private fb:FormBuilder) {
        this.loginform = this.fb.group({
          username:['',Validators.required],
          password:['',Validators.required],
        });
   }

  loginData:Login = {userName:'',password:''};
  
  onSubmit():void {
    this.loginData.userName = this.loginform.get("username")?.value;
    this.loginData.password = this.loginform.get("password")?.value;
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
