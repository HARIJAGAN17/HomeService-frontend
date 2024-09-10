import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerBookingServiceData } from '../../model/customerBookedData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompletedordersService {

  constructor(private http:HttpClient) { }

  baseUrl:string = " http://localhost:5131/api/CompletedOrder";

  AddCompletedServices(data:CustomerBookingServiceData):Observable<CustomerBookingServiceData>{

    return this.http.post<CustomerBookingServiceData>(this.baseUrl,data);
  }
}
