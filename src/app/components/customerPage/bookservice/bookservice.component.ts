import { sendBooking } from './../../../model/sendBooking';
import { Component } from '@angular/core';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';
import { ServiceResponse } from '../../../model/serviceget';
import { CustomerCrudService } from '../../../services/customer/customer-crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookservice',
  templateUrl: './bookservice.component.html',
  styleUrl: './bookservice.component.css'
})
export class BookserviceComponent {
  allServices: ServiceResponse[] = []; 
  filteredServices: ServiceResponse[] = []; 
  categories: string[] = []; 

  constructor(private providerService: ProviderCrudService,private customerService:CustomerCrudService) {}

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


  // --------------------------popup----------------------------
  showPopup: boolean = false;

  selectedDate: string = '';
  currentBookingServiceId:number=0;
  currentBookingProviderId:string='';

  togglePopup(currentData:ServiceResponse){

   this.currentBookingProviderId=currentData.providerId;
   this.currentBookingServiceId=currentData.serviceId;

   this.selectedDate='';
    this.showPopup = !this.showPopup;
  }

  toggleClose(){

    this.showPopup=!this.showPopup;
    this.selectedDate='';
  }
  
  bookingData:sendBooking={date:'',providerId:'',serviceId:0};
  onPopSubmit() {
    
    const [year, month, day] = this.selectedDate.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    this.bookingData.date=formattedDate;
    this.bookingData.serviceId=this.currentBookingServiceId;
    this.bookingData.providerId=this.currentBookingProviderId;

    this.customerService.AddBooking(this.bookingData).subscribe({
      next:(responseData:any)=>{
        console.log(responseData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your service is Booked",
          showConfirmButton: false,
          timer: 1500
        });
      },error:(error)=> {
        console.log(error)
      },complete:()=>{
        console.log("added booking successfully");
      }
    });

    this.showPopup=!this.showPopup;
  }
}
