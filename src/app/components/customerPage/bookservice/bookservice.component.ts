import { sendBooking } from './../../../model/sendBooking';
import { Component } from '@angular/core';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';
import { ServiceResponse } from '../../../model/serviceget';
import { CustomerCrudService } from '../../../services/customer/customer-crud.service';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';

@Component({
  selector: 'app-bookservice',
  templateUrl: './bookservice.component.html',
  styleUrl: './bookservice.component.css'
})
export class BookserviceComponent {
  allServices: ServiceResponse[] = []; 
  filteredServices: ServiceResponse[] = []; 
  categories: string[] = []; 

  constructor(private providerService: ProviderCrudService,private customerService:CustomerCrudService,private loginservice:LoginserviceService) {}

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
  

  //data for send email to provider
  currentServicePopupData: ServiceResponse = {
    serviceId: 0,        
    serviceName: '',      
    category: '',         
    description: '',      
    price: 0,            
    experience: 0,       
    providerName: '',     
    providerId: '',       
    providerEmail: '',
    location: '',    
};


  togglePopup(currentData:ServiceResponse){
   
   this.currentServicePopupData=currentData;

   this.selectedDate='';
    this.showPopup = !this.showPopup;
  }

  toggleClose(){

    this.showPopup=!this.showPopup;
    this.selectedDate='';
  }
  
  bookingData:sendBooking={date:'',providerId:'',serviceId:0};
  onPopSubmit() {
    
    if(this.selectedDate.length>0){
      const [year, month, day] = this.selectedDate.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    this.bookingData.date=formattedDate;
    this.bookingData.serviceId=this.currentServicePopupData.serviceId;
    this.bookingData.providerId=this.currentServicePopupData.providerId;

    this.customerService.AddBooking(this.bookingData).subscribe({
      next:(responseData:any)=>{
        console.log(responseData);

        //sending email to provider

        //customer name from login service;
        var payload=this.loginservice.haveAccess();
        var customerName = payload.UserName;
        emailjs.init("RU2fbINeyQ4ziAvLK");
        emailjs.send("service_5wzy3w3","template_e0c2k6q",{
          from_name: "HomeEase",
          to_name: this.currentServicePopupData.providerName,
          customer_name: customerName,
          service_name: this.currentServicePopupData.serviceName,
          price: this.currentServicePopupData.price,
          description: this.currentServicePopupData.description,
          location: this.currentServicePopupData.location,
          booking_date: formattedDate,
          to_email: this.currentServicePopupData.providerEmail,
        
        }).then(
          (response) => {
            console.log('SUCCESS mail sent!', response.status, response.text);
          },
          (err) => {
            console.log('FAILED...', err);
          },
        );



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
    else{
      Swal.fire({
        title: "Date required",
        text: "You forgot to select the date?",
        icon: "question"
      });
    }
  }
}
