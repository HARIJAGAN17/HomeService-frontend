import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/home/register/register.component';
import { LandingpageComponent } from './components/home/landingpage/landingpage.component';
import { LoginComponent } from './components/home/login/login.component';
import { LandingcontentComponent } from './components/home/landingcontent/landingcontent.component';
import { ProviderLayoutComponent } from './components/providerpage/provider-layout/provider-layout.component';
import { ProvidercontentComponent } from './components/providerpage/providercontent/providercontent.component';
import { AuthGuard } from './shared/auth.guard';
import { CustomerLayoutComponent } from './components/customerPage/customer-layout/customer-layout.component';
import { CustomerContentComponent } from './components/customerPage/customer-content/customer-content.component';
import { ProviderGuard } from './shared/provider.guard';
import { CustomerGuard } from './shared/customer.guard';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",component:LandingpageComponent,children:[
    {path:"",redirectTo:"landing",pathMatch:'full'},
    {path:"landing",component:LandingcontentComponent},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
  ]},
  {path:"provider",component:ProviderLayoutComponent,canActivate:[AuthGuard,ProviderGuard],children:[
    {path:"",redirectTo:"providerservice",pathMatch:"full"},
    {path:"providerservice",component:ProvidercontentComponent}
  ]},
  {path:"customer",component:CustomerLayoutComponent,canActivate:[AuthGuard,CustomerGuard],children:[
    {path:"",redirectTo:"customerBooking",pathMatch:'full'},
    {path:"customerBooking",component:CustomerContentComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
