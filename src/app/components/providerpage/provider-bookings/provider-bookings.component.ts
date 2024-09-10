import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CustomerBookingServiceData } from '../../../model/customerBookedData';
import { BookingResponse } from '../../../model/getBooking';
import { ServiceResponse } from '../../../model/serviceget';
import { CustomerCrudService } from '../../../services/customer/customer-crud.service';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';
import { updateBookingStatus } from '../../../model/updateStatus';

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

  OnUpdateStatus(data:CustomerBookingServiceData){
      this.BookingStatusUpdateData.status='Confirmed';
      this.updateBookingStatus(data.bookingId,this.BookingStatusUpdateData);
  }

  OnDeleteBooking(data:CustomerBookingServiceData){

    var bookingId = data.bookingId;
    this.customerService.DeleteBooking(bookingId).subscribe({
      next:(responseData:any)=>{
        console.log("Booking decline:"+responseData);
        this.getBookingData();
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

  StausMail(){

  }

}
