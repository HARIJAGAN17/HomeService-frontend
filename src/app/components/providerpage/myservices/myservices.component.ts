import { Component } from '@angular/core';
import { ServiceResponse } from '../../../model/serviceget';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrl: './myservices.component.css'
})
export class MyservicesComponent {
  allServices: ServiceResponse[] = []; 
  filteredServices: ServiceResponse[] = []; 
  categories: string[] = []; 

  constructor(private providerService: ProviderCrudService,private loginService:LoginserviceService) {}

  ngOnInit(): void {
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
}
