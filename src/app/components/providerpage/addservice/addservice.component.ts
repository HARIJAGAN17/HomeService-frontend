import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';
import { sendService } from '../../../model/sendService';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrl: './addservice.component.css'
})
export class AddserviceComponent {

  addserviceForm:FormGroup;

  constructor(private fb:FormBuilder,private providerService:ProviderCrudService){
    this.addserviceForm = this.fb.group({
      serviceName:[''],
      category:[''],
      description:[''],
      price:[''],
      experience:[''],
      location:[''],
    });
  }

  formData:sendService={serviceName:'',experience:0,price:0,category:'',description:'',location:''};

  onAddService() {
    // Initialize formData
    this.formData = {
      serviceName: this.getTrimmedAndCapitalizedValue('serviceName'),
      experience: this.addserviceForm.get('experience')?.value,
      price: this.addserviceForm.get('price')?.value,
      category: this.getTrimmedAndCapitalizedValue('category'),
      description: this.getTrimmedAndCapitalizedValue('description'),
      location: this.getTrimmedAndCapitalizedValue('location')
    };
  
    this.providerService.addService(this.formData).subscribe({
      next:(responseData:any)=>{
        console.log(responseData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your service is added",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error:(error)=>{
        console.log(error);
      },complete:()=>{
        console.log("Completed successfully");
      }
    })
  }
  
  getTrimmedAndCapitalizedValue(controlName: string): string {

    const value = this.addserviceForm.get(controlName)?.value;
    const trimmedValue = value.trim();
    return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
  }
  
}


