import { Component } from '@angular/core';
import { BookingResponse } from '../../../model/getBooking';
import { CustomerCrudService } from '../../../services/customer/customer-crud.service';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';
import { ProviderCrudService } from '../../../services/provider/provider-crud.service';

@Component({
  selector: 'app-bookedservice',
  templateUrl: './bookedservice.component.html',
  styleUrl: './bookedservice.component.css'
})
export class BookedserviceComponent {

  constructor(private customerService:CustomerCrudService,private providerService:ProviderCrudService,
    private loginService:LoginserviceService){

  }

  BookingData:BookingResponse[]=[];

  currentCustomerId:string='';

  currenBookings:BookingResponse[]=[];

  FetchData(){

    var payload = this.loginService.haveAccess();
    this.currentCustomerId=payload.UserId;

    this.customerService.getBookings().subscribe({
      next:(responseData:BookingResponse[])=>{
        this.BookingData=responseData;
      },error:(error)=>{
        console.log(error);
      },complete:()=>{
        
      }
    });

    this.currenBookings = this.BookingData.filter(x=>x.customerId=this.currentCustomerId);

    console.log(this.currenBookings);

  }
}
