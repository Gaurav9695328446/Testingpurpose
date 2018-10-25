import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharePopupModule } from './common/share-profile-popup/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './common/login/login.component';
import { CollapseModule, ModalModule, TabsModule, TypeaheadModule, BsDatepickerModule } from 'ngx-bootstrap';
import { RegisterComponent } from './common/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './core/config/interceptor.service';
import { AuthGuard } from './core/config/auth.guard';
import { RatingModule } from 'ngx-bootstrap/rating';
import { HomeService } from './core/service/home.service';
import { FooterComponent } from './common/footer/footer.component';
import { TrendingLeadersComponent } from './trending-leaders/trending-leaders.component';
import { CoreModule } from './core/core.module';
import { ChangePwdComponent } from './common/change-pwd/change-pwd.component';
import { DialogComponent } from './common/dialog/dialog.component';
import { MyLeaderProfileSuccessComponent } from './msg-components/my-leader-profile-success/my-leader-profile-success.component';
import { SliderByScreenModule } from './common/slider-by-screen/slider-by-screen.module';
import { ForgetPasswordComponent } from './common/forget-password/forget-password.component';


//modules

//import { PublicModule } from '../app/modules/public/public.module';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    TrendingLeadersComponent,
    ChangePwdComponent,
    DialogComponent,
    MyLeaderProfileSuccessComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    TypeaheadModule.forRoot(),
    SharePopupModule,
    BsDatepickerModule.forRoot(),
    CoreModule,
    BrowserAnimationsModule,
    SliderByScreenModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    AuthGuard,
    HomeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    ChangePwdComponent,
    DialogComponent,
    MyLeaderProfileSuccessComponent
  ]
})
export class AppModule { }
