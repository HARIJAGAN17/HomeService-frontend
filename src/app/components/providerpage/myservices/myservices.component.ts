import { Component } from '@angular/core';
import { ServiceResponse } from '../../../model/serviceget';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { sendService } from '../../../model/sendService';
@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrl: './myservices.component.css'
})
export class MyservicesComponent {
  allServices: ServiceResponse[] = []; 
  filteredServices: ServiceResponse[] = []; 
  categories: string[] = []; 

  updateForm:FormGroup;

  constructor(private providerService: ProviderCrudService,private loginService:LoginserviceService,private fb:FormBuilder) {

    this.updateForm = this.fb.group({
      providerName:[{ value: '', disabled: true },],
      experience:[''],
      category:[''],
      serviceName:[''],
      price:[''],
      location:[''],
      description:[''],
    });
  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices():void{
    this.providerService.getServices().subscribe({
      next: (responseData: ServiceResponse[]) => {
        
        var payload = this.loginService.haveAccess();
        var userId = payload.UserId;
        
        this.allServices = responseData.filter(x=>x.providerId === userId);
        this.filteredServices = this.allServices;
        this.categories = [...new Set(responseData.map(service => service.category))];
      },
      error: (error) => {
        if (error.status === 401) {
          console.log("Unauthorized");
        }
      }
    });
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;

    if (selectedCategory === '') {
      this.filteredServices = this.allServices; 
    } else {
      this.filteredServices = this.allServices.filter(service => service.category === selectedCategory);
    }
  }

  onDelete(id:number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.providerService.delteService(id).subscribe({
          next:(response:any)=>{
            this.getServices();
            console.log(response);
          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{
            console.log("completed")
          }
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your service has been deleted.",
          icon: "success"
        });
      }
    });
      
  }

  // popupform

  showPopUp:boolean=false;

  togglePopUp(){
    this.showPopUp=!this.showPopUp;
  }


  //onUpdate
  currentServiceDetails:any;
  sendUpdate(service:any){

    this.updateForm.patchValue({
      providerName: service.providerName,
      experience: service.experience,
      category: service.category,
      serviceName: service.serviceName,
      price: service.price,
      description: service.description,
      location: service.location
    })

    this.currentServiceDetails=service;
  }

  

  updateData:sendService = {experience:0,category:'',serviceName:'',price:0,description:'',location:''}
  onUpdateSubmit(){
    
   var serviceId = this.currentServiceDetails.serviceId;
   this.updateData.experience=this.updateForm.get('experience')?.value;
   this.updateData.category=this.updateForm.get('category')?.value;
   this.updateData.serviceName=this.updateForm.get('serviceName')?.value;
   this.updateData.price=this.updateForm.get('price')?.value;
   this.updateData.description=this.updateForm.get('description')?.value;
   this.updateData.location=this.updateForm.get('location')?.value;

   Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  }).then((result) => {
    
    if (result.isConfirmed) {

      this.providerService.updateService(serviceId,this.updateData).subscribe({
        next:(responseData:any)=>{
          this.getServices();
          console.log(responseData);
        },
        error:(error)=>{
          console.log(error);
        },
        complete:()=>{
          console.log("completed Update")
        }
       })
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
  }

}

