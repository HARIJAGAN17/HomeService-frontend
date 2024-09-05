import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from '../../model/serviceget';

@Injectable({
  providedIn: 'root'
})
export class ProviderCrudService {


  baseUrl:string = "http://localhost:5131/api/Service";

  constructor(private http:HttpClient) { }


  getServices():Observable<ServiceResponse[]>{
    return this.http.get<ServiceResponse[]>(this.baseUrl);
  }
}
