import { response } from './../../../model/response';
import { Component } from '@angular/core';
import { register } from '../../../model/register';
import { RegisteruserService } from '../../../services/registerservices/registeruser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username:string='';
  password:string='';
  email:string='';
  confirmpassword:string='';
  role:string='';

  registerData:register={userName:'',email:'',password:''};

  registerResponse:response={status:'',message:''};

  constructor(private registerServie:RegisteruserService){}

  Register(){
    this.registerData.email=this.email;
    this.registerData.password=this.password;
    this.registerData.userName = this.username;

    if(this.password==this.confirmpassword){
      this.registerServie.RegisterUser(this.registerData,this.role).subscribe({
        next:(responseData:response)=>{
          this.registerResponse=responseData;
        },
        error:(error)=>{
          console.log(error);
        },
        complete:()=>{
          console.log(this.registerResponse);
        }
      });
    }
    else{
      Swal.fire({
        title: 'Password Mismatch',
        text: 'The password and confirm password do not match. Please try again.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
    
  }
}
