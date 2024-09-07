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
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ForbiddenpageComponent } from './components/forbiddenpage/forbiddenpage.component';
import { MyservicesComponent } from './components/providerpage/myservices/myservices.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",component:LandingpageComponent,children:[
    {path:"",redirectTo:"landing",pathMatch:'full'},
    {path:"landing",component:LandingcontentComponent},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
  ]},
  {path:"provider",component:ProviderLayoutComponent,canActivate:[AuthGuard,ProviderGuard],children:[
    {path:"",redirectTo:"allServices",pathMatch:"full"},
    {path:"allServices",component:ProvidercontentComponent},
    {path:"myservice",component:MyservicesComponent}
  ]},
  {path:"customer",component:CustomerLayoutComponent,canActivate:[AuthGuard,CustomerGuard],children:[
    {path:"",redirectTo:"customerBooking",pathMatch:'full'},
    {path:"customerBooking",component:CustomerContentComponent}
  ]},
  {path:"noauth",component:ForbiddenpageComponent},
  {path:"**",component:PagenotfoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
