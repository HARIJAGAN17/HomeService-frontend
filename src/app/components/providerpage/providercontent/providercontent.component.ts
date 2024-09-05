import { Component, OnInit } from '@angular/core';
import { ServiceResponse } from '../../../model/serviceget';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';

@Component({
  selector: 'app-providercontent',
  templateUrl: './providercontent.component.html',
  styleUrls: ['./providercontent.component.css'],
})
export class ProvidercontentComponent implements OnInit {

  allServices: ServiceResponse[] = []; 

  constructor(private providerService: ProviderCrudService) {}

  ngOnInit(): void { // Correct lifecycle hook name
    this.providerService.getServices().subscribe({
      next: (responseData: ServiceResponse[]) => {
        this.allServices = responseData;
      },
      error: (error) => {
        if (error.status === 401) {
          console.log("Unauthorized");
        }
      }
    });
  }
}
