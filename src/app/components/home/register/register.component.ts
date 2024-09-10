import { response } from './../../../model/response';
import { Component } from '@angular/core';
import { register } from '../../../model/register';
import { RegisteruserService } from '../../../services/registerservices/registeruser.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  

  registerData:register={userName:'',email:'',password:''};

  registerResponse:response={status:'',message:''};

  registerForm:FormGroup

  loading:boolean=false;

  constructor(private registerServie:RegisteruserService,private fb:FormBuilder){
    
    this.registerForm = this.fb.group({
      username:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
      role:['',Validators.required]
    });
  }


  validateControl(input:string){
    return this.registerForm.get(input)?.invalid && (this.registerForm.get(input)?.touched || this.registerForm.get(input)?.dirty );
  }


  Register(){
    this.registerData.userName = this.registerForm.get('username')?.value;
    this.registerData.email =this.registerForm.get('email')?.value;
    this.registerData.password=this.registerForm.get('password')?.value;
    this.registerData.userName = this.registerForm.get('username')?.value;

    this.loading=true;

    if(this.registerForm.valid){
      if(this.registerForm.get('password')?.value==this.registerForm.get('confirmPassword')?.value){
        this.registerServie.RegisterUser(this.registerData,this.registerForm.get('role')?.value).subscribe({
          next:(responseData:response)=>{
            this.registerResponse=responseData;
            this.loading=false;
            this.registerForm.reset();
          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{
            console.log(this.registerResponse);
            console.log(this.registerForm.value);
            const status = this.registerResponse.status.toLowerCase();
            if (status === 'success') {
              Swal.fire({
                title: 'Registration Successful',
                text: 'You have registered successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
              });
            } else if (status === 'failed') {
              Swal.fire({
                title: 'Registration Failed',
                text: this.registerResponse.message,
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 3000
              });
            } else if (status === 'passwordcondition') {
              Swal.fire({
                title: 'Registration Failed',
                text: this.registerResponse.message,
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 3000
              });
            }
          }
        });
      }
      else{
        Swal.fire({
          title: 'Password Mismatch',
          text: 'The password and confirm password do not match. Please try again.',
          icon: 'warning',
          confirmButtonText: 'OK',
          timer: 3000
        });
      }
    }else{
      Swal.fire({
        title: 'Invalid details',
        text: 'Enter the details properly',
        icon: 'warning',
        confirmButtonText: 'OK',
        timer: 3000
      });
    }
    
  }
}
