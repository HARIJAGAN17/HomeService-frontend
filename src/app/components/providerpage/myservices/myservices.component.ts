import { Component } from '@angular/core';
import { ServiceResponse } from '../../../model/serviceget';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
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


  showPopUp:boolean=false;

  togglePopUp(){
    this.showPopUp=!this.showPopUp;
  }
}
