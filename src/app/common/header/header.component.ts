import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/service/auth.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { log } from 'util';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HomeService } from '../../core/service/home.service';

import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('input')
  inputRef: ElementRef;
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;
  statesComplex: any[] = [];
  trendingInterviews: any[] = [];
  currentNavigation = "";
  navigationUnsubscribe = null;
  myProfile: any = {};

  isCollapsed = true;
  bsModalRef: BsModalRef;
  message: any;
  subscription: Subscription;
  myProfileData: any;
  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private router: Router, private httpClient: HttpClient, private homeService: HomeService) {
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    })
      .pipe(
        mergeMap((token: string) => this.getStatesAsObservable(token))
      );
    this.subscription = this.authService.getLoginStatus().subscribe(message => {
   
      this.message = message.text;
      if (this.message === true) {
        this.getMyProfile();
      }
    });
    this.navigationUnsubscribe = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentNavigation = e.urlAfterRedirects;
      }

    });
  }

  login() {
    this.bsModalRef = this.modalService.show(LoginComponent);
  }

  register() {
    this.bsModalRef = this.modalService.show(RegisterComponent);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.navigationUnsubscribe.unsubscribe();
  }
  logout() {
    localStorage.removeItem('token');
    this.authService.setLoginStatus(false);
    this.router.navigate(['/home']);
  }
  ngOnInit() {
    const authToken = JSON.parse(window.localStorage.getItem('token'));
    if (authToken != null && authToken['result']['access_token']) {
      // logged in so return true
      this.authService.setLoginStatus(true);
      this.getMyProfile();
    } else {
      this.authService.setLoginStatus(false);
    }
    //listen : open login popup outside this component
    this.authService.getLoginPopup().subscribe(data => {
      if (data.isOpen) {
        this.login();
      }
    });
  }


  //---------------------------------

  getStatesAsObservable(token: string): Observable<any> {

    return this.homeService.getProfileByName(token).pipe
      (map((response) => {
        return response.body["profiles"];
      }));

  }



  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    let id = e.item.id;
    this.asyncSelected = "";
    this.router.navigate(['/profile/' + id]);
  }

  searchApi() { }

  getMyProfile() {
    this.httpClient.get(API_URL + 'account/getDetails', { observe: 'response' }).subscribe(res => {
      if (res.status === 200) {
        this.myProfile = res.body;
        this.myProfile.firstName = this.myProfile.name.charAt(0);
        var lastName = this.myProfile.name.lastIndexOf(" ");

        this.myProfile.lastName = this.myProfile.name.substring(lastName, lastName + 2);

      }
    }, function (error) {
      console.log(error);
    })
  }


}
