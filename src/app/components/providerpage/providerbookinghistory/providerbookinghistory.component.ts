import { Component } from '@angular/core';
import { CustomerBookingServiceData } from '../../../model/customerBookedData';
import { CompletedordersService } from '../../../services/completedOrder/completedorders.service';
import { LoginserviceService } from '../../../services/loginservices/loginservice.service';

@Component({
  selector: 'app-providerbookinghistory',
  templateUrl: './providerbookinghistory.component.html',
  styleUrl: './providerbookinghistory.component.css'
})
export class ProviderbookinghistoryComponent {

  constructor(private loginservice:LoginserviceService,private completeOrderService:CompletedordersService){

  }

  completedOrders:CustomerBookingServiceData[] =[];

  ngOnInit(){
    var payload = this.loginservice.haveAccess();
    var providerId = payload.UserId;

    this.completeOrderService.getCompletedServices().subscribe({
        next:(responseData:CustomerBookingServiceData[])=>{
          console.log(responseData);
          console.log(providerId);
          this.completedOrders=responseData.filter(orders=>orders.providerId===providerId);
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
