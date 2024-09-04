import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingpageComponent } from './components/home/landingpage/landingpage.component';
import { RegisterComponent } from './components/home/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/home/login/login.component';
import { LandingcontentComponent } from './components/home/landingcontent/landingcontent.component';
import { ProviderLayoutComponent } from './components/providerpage/provider-layout/provider-layout.component';
import { ProvidercontentComponent } from './components/providerpage/providercontent/providercontent.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingpageComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    LandingcontentComponent,
    ProviderLayoutComponent,
    ProvidercontentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
