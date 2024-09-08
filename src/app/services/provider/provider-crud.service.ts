import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from '../../model/serviceget';
import { sendService } from '../../model/sendService';

@Injectable({
  providedIn: 'root'
})
export class ProviderCrudService {


  baseUrl:string = "http://localhost:5131/api/Service";

  constructor(private http:HttpClient) { }


  getServices():Observable<ServiceResponse[]>{
    return this.http.get<ServiceResponse[]>(this.baseUrl);
  }

  delteService(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
  }
  
  updateService(id:number,data:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${id}`,data);
  }

  addService(data:sendService):Observable<any>{
    return this.http.post<any>(this.baseUrl,data);
  }
  
}
