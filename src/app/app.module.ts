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
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TokeninterceptorService } from './services/interceptor/tokeninterceptor.service';

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
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
