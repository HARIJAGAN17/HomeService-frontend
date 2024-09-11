import { CustomerBookingServiceData } from './../../../model/customerBookedData';
import { Component,OnInit } from '@angular/core';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';
import { CompletedordersService } from '../../../services/completedOrder/completedorders.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css'
})
export class BookingHistoryComponent implements OnInit {

  constructor(private loginservice:LoginserviceService,private completeOrderService:CompletedordersService){

  }

  completedOrders:CustomerBookingServiceData[] =[];

  ngOnInit(){
    var payload = this.loginservice.haveAccess();
    var customerId = payload.UserId;

    this.completeOrderService.getCompletedServices().subscribe({
        next:(responseData:CustomerBookingServiceData[])=>{
          console.log(responseData);
          console.log(customerId);
          this.completedOrders=responseData.filter(orders=>orders.customerId===customerId);
        },
        error:(error)=>{
          console.log(error)
        },
        complete:()=>{
         
          console.log("completed orders fetched");
        }
    });
  }
}
