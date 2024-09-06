import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../model/login';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginform:FormGroup;

  constructor(private router: Router,private loginService:LoginserviceService,private fb:FormBuilder,private route:Router) {
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
        localStorage.setItem("token",data.token);

        const role = this.loginService.haveAccess();
        if (role.toLowerCase() === 'provider'){
          this.route.navigate(['/provider'])
        }
        else if (role.toLowerCase() === 'customer'){
          this.route.navigate(['/customer'])
        }
        
      },
      error:(error)=>{
        console.log(error);
        if(error.status===401){
          Swal.fire({
            icon: "error",
            title: "No user exist",
            text:'please check your password and username',
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
      complete:()=>{
        console.log("completed successfully");
      }
    })
  }


}
