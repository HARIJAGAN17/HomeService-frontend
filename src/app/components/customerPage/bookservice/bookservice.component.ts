import { Component } from '@angular/core';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';
import { ServiceResponse } from '../../../model/serviceget';

@Component({
  selector: 'app-bookservice',
  templateUrl: './bookservice.component.html',
  styleUrl: './bookservice.component.css'
})
export class BookserviceComponent {
  allServices: ServiceResponse[] = []; 
  filteredServices: ServiceResponse[] = []; 
  categories: string[] = []; 

  constructor(private providerService: ProviderCrudService) {}

  ngOnInit(): void {
    this.providerService.getServices().subscribe({
      next: (responseData: ServiceResponse[]) => {
        this.allServices = responseData;
        this.filteredServices = responseData; 
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


  onBook(data:ServiceResponse){
    console.log(data);
  }
}
