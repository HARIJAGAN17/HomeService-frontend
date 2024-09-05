import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-layout',
  templateUrl: './provider-layout.component.html',
  styleUrl: './provider-layout.component.css'
})
export class ProviderLayoutComponent {

  constructor(private route:Router){}
  callSignOut(){
    localStorage.clear();
    this.route.navigate(['/home']);
  }
}
