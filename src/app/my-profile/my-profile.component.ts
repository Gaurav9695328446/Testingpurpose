import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap';
import { ChangePwdComponent } from "../common/change-pwd/change-pwd.component";


const API_URL = environment.API_URL;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  myProfile: any = {};

  constructor(private httpClient: HttpClient, private modalService: BsModalService) { }

  ngOnInit() {
    this.getMyProfile();
  }

  getMyProfile() {
    this.httpClient.get(API_URL + 'account/getDetails', { observe: 'response' }).subscribe(res => {
      if (res.status === 200) {
        this.myProfile = res.body;
      }
    }, function (error) {
      console.log(error);
    })
  }

  showChangePwd() {
    this.modalService.show(ChangePwdComponent);
  }

}
