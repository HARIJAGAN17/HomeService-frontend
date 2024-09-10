import { sendBooking } from './../../model/sendBooking';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingResponse } from '../../model/getBooking';
import { updateBookingStatus } from '../../model/updateStatus';

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

   updateBooking(id:number,updateData:updateBookingStatus):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${id}`,updateData);
   }

   DeleteBooking(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
   }
}
