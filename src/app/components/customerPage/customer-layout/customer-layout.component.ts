import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

  constructor(private route:Router){}
  
  callSignOut(){
    localStorage.clear();
    this.route.navigate(['/home']);
  }
}
