import { sendBooking } from './../../model/sendBooking';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingResponse } from '../../model/getBooking';

@Injectable({
  providedIn: 'root'
})
export class CustomerCrudService {


  baseUrl:string = "http://localhost:5131/api/Bookings";

  constructor(private http:HttpClient) {

   }

   AddBooking(bookingData:sendBooking):Observable<any>{

    return this.http.post<any>(this.baseUrl,bookingData);
   }

   getBookings():Observable<BookingResponse[]>{
    return this.http.get<BookingResponse[]>(this.baseUrl);
   }
}
