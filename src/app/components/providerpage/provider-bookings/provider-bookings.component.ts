import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CustomerBookingServiceData } from '../../../model/customerBookedData';
import { BookingResponse } from '../../../model/getBooking';
import { ServiceResponse } from '../../../model/serviceget';
import { CustomerCrudService } from '../../../services/customer/customer-crud.service';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';
import { updateBookingStatus } from '../../../model/updateStatus';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-provider-bookings',
  templateUrl: './provider-bookings.component.html',
  styleUrl: './provider-bookings.component.css'
})
export class ProviderBookingsComponent implements OnInit {

  BookingData: BookingResponse[] = [];
  ServiceData: ServiceResponse[] = [];
  currentProviderId: string = '';
  currentProviderData: CustomerBookingServiceData[] = [];

  constructor(
    private customerService: CustomerCrudService,
    private providerService: ProviderCrudService,
    private loginService: LoginserviceService
  ) {}

  ngOnInit() {
    
    // Fetch both bookings and services in parallel
    this.getBookingData();
  }

  getBookingData(){
    forkJoin({
      bookings: this.customerService.getBookings(),
      services: this.providerService.getServices()
    }).subscribe({
      next: ({ bookings, services }) => {
        this.BookingData = bookings;
        this.ServiceData = services;
        this.FetchData();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }


  FetchData() {
    const payload = this.loginService.haveAccess();
    this.currentProviderId = payload.UserId;

    // Filter current user bookings
    const filteredBookings = this.BookingData.filter(
      booking => booking.providerId === this.currentProviderId
    );

    // Create a map of serviceId,ServiceResponse
    const serviceMap = new Map<number, ServiceResponse>(
      this.ServiceData.map(service => [service.serviceId, service])
    );

    this.currentProviderData = filteredBookings.map(booking => {
      const service = serviceMap.get(booking.serviceId);
      return {
        bookingId: booking.bookingId,
        date: booking.date,
        status: booking.status,
        customerName: booking.customerName,
        customerId: booking.customerId,
        providerId: booking.providerId,
        customerEmail:booking.customerEmail,
        serviceId: booking.serviceId,
        serviceName: service?.serviceName || '',
        category: service?.category || '',
        description: service?.description || '',
        price: service?.price || 0,
        experience: service?.experience || 0,
        providerName: service?.providerName || '',
        providerEmail: service?.providerEmail || '',
        location: service?.location || ''
      };
    });
    console.log('Current Customer Data:', this.currentProviderData);
  }

  //status part

  BookingStatusUpdateData:updateBookingStatus={status:''};



  currentBookingData: CustomerBookingServiceData = {
    bookingId: 0,
    date: '',
    status: '',
    customerName: '',
    customerId: '',
    providerId: '',
    customerEmail: '',
    serviceId: 0,
    serviceName: '',
    category: '',
    description: '',
    price: 0,
    experience: 0,
    providerName: '',
    providerEmail: '',
    location: ''
};

OnUpdateStatus(data: CustomerBookingServiceData) {
  // Update the status
  this.BookingStatusUpdateData.status = 'Confirmed';
  this.updateBookingStatus(data.bookingId, this.BookingStatusUpdateData);

  // Use type assertion if you are confident that a booking will always be found
  this.currentBookingData = this.currentProviderData.find(booking => booking.bookingId === data.bookingId) as CustomerBookingServiceData;

  //this.StatusMail("Confirmed",this.currentBookingData);
}


  OnDeleteBooking(data:CustomerBookingServiceData){

    var bookingId = data.bookingId;
    this.customerService.DeleteBooking(bookingId).subscribe({
      next:(responseData:any)=>{
        console.log("Booking decline:"+responseData);
        this.BookingStatusUpdateData.status='Cancelled';
        this.updateBookingStatus(bookingId,this.BookingStatusUpdateData);

        this.currentBookingData = this.currentProviderData.find(booking => booking.bookingId === data.bookingId) as CustomerBookingServiceData;
        //this.StatusMail("Declined",this.currentBookingData);
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        console.log("Completed delete");
      }
      
    });
  }

  updateBookingStatus(id:number,data:updateBookingStatus){
    this.customerService.updateBooking(id,data).subscribe({
      next:(responseData:any)=>{
        console.log("Booking Update:"+responseData);
        this.getBookingData();
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        console.log("Completed delete");
      }
    })
  }

  StatusMail(status:string,data:CustomerBookingServiceData){
    emailjs.init("RU2fbINeyQ4ziAvLK");
    emailjs.send("service_rjvfc6q","template_472kxru",{
      to_name: data.customerName,
      booking_date: data.date,
      booking_status: status,
      customerName: data.customerName,
      serviceName: data.serviceName,
      category: data.category,
      description: data.description,
      price: data.price,
      location: data.location,
      providerName: data.providerName,
      providerEmail: data.providerEmail,
      to_email: data.customerEmail,
      });
  }


}
