import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profiledetails } from '../model/Profiledetails';
import { LikeDislikeModel, RatingModel, AddRatingModel } from '../model/LikeDislikeModel';
import { AuthService } from '../core/service/auth.service';
import { Subscription } from 'rxjs';
import { ShareButtons } from '@ngx-share/core';

import { environment } from '../../environments/environment';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  max = 5;
  rateingOfProfile = 0;
  ratings: any;
  isReadonly = false;
  modalRef: BsModalRef;
  value = false;
  noOfPersonRated = 0;
  profiledetails: any;
  selectedSection = 'about';
  likedislikeModel: any;
  likeCounter = 0;
  dislikeCounter = 0;
  ratingModel: any;
  addRatingModel: any;
  subscription: Subscription;
  message: any;


  constructor(private modalService: BsModalService,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private authService: AuthService,
    public shareButton: ShareButtons
  ) {
    console.log("shareButton", shareButton);
    this.profiledetails = new Profiledetails();
    this.likedislikeModel = new LikeDislikeModel();
    this.ratingModel = new RatingModel();
    this.addRatingModel = new AddRatingModel();
    this.subscription = this.authService.getLoginStatus().subscribe(message => {
      this.message = message;
    });
  }

  ngOnInit() {
    const authToken = JSON.parse(window.localStorage.getItem('token'));
    if (authToken != null && authToken['result']['access_token']) {
      // logged in so return true
      this.authService.setLoginStatus(true);
    } else {
      this.authService.setLoginStatus(false);
    }
    this.setRatingModel();
    this.getProfile();
  }

  selectSection(section) {
    this.selectedSection = section;
  }

  addRating() {
    // let sum = this.ratingModel.overallRating +
    //   this.ratingModel.personalImage +
    //   this.ratingModel.PartyOrganisat +
    //   this.ratingModel.qualification +
    //   this.ratingModel.honesty +
    //   this.ratingModel.accessibility +
    //   this.ratingModel.workPerformance +
    //   this.ratingModel.transparency +
    //   this.ratingModel.activeness;
    // let avg = sum / 8;
    this.addRatingModel.personalImage = this.ratingModel.personalImage;
    this.addRatingModel.partyImage = this.ratingModel.PartyOrganisat;
    this.addRatingModel.qualification = this.ratingModel.qualification;
    this.addRatingModel.honesty = this.ratingModel.honesty;
    this.addRatingModel.accessbility = this.ratingModel.accessibility;
    this.addRatingModel.workPerformance = this.ratingModel.workPerformance;
    this.addRatingModel.transparancy = this.ratingModel.transparency;
    this.addRatingModel.acctiveness = this.ratingModel.activeness;


    this.httpClient.post(API_URL + 'client/addRating', this.addRatingModel)
      .subscribe((res) => {
        this.modalService.hide(1);
        this.toastrService.success(res["message"], "Success");
        this.getProfile();
      });
  }
  clearRating() {
    this.ratingModel.overallRating = this.ratingModel.personalImage = this.ratingModel.PartyOrganisat = this.ratingModel.qualification
      = this.ratingModel.honesty = this.ratingModel.accessibility = this.ratingModel.workPerformance = this.ratingModel.transparency = this.ratingModel.activeness = 0;
  }
  closeRating() {
    this.modalService.hide(1);
  }
  setRatingModel() {
    this.ratingModel.overallRating = 0;
    this.ratingModel.personalImage = 0;
    this.ratingModel.PartyOrganisat = 0;
    this.ratingModel.qualification = 0;
    this.ratingModel.honesty = 0;
    this.ratingModel.accessibility = 0;
    this.ratingModel.workPerformance = 0;
    this.ratingModel.transparency = 0;
  }

  openModal(template: TemplateRef<any>) {
    if (!this.authService.isLoggedIn) {
      this.authService.openLoginPopup(true);
      return;
    }
    this.modalRef = this.modalService.show(template);
  }
  getProfile() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.likedislikeModel.profileId = params['id'];
        this.addRatingModel.profileId = params['id'];
        console.log(this.likedislikeModel);
        this.httpClient.get(API_URL + `admin/getProfiles?id=${params['id']}`)
          .subscribe((res) => {

            if (res && res['profiles'].length) {
              this.profiledetails = res['profiles'][0].profileDetails;
              this.likeCounter = res['profiles'][0].like;
              this.dislikeCounter = res['profiles'][0].dislike;
              this.rateingOfProfile = res['profiles'][0].rating;
              this.noOfPersonRated = res['profiles'][0].noOfPersonRated;
              this.ratings = res['profiles'][0].ratings;

              let ratingCount = this.ratings.pImageRating +
                this.ratings.accessRating +
                this.ratings.partyImageRating +
                this.ratings.activeRating +
                this.ratings.qualificationRating +
                this.ratings.workRating +
                this.ratings.honestyRating +
                this.ratings.transparacyRating;

              this.rateingOfProfile = ratingCount * 100 / 40;

              this.rateingOfProfile = Math.round(this.rateingOfProfile / 20);

              console.log("<><><><><><>", res['profiles'][0].ratings);
            }
          });
      }
    });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  likeProfile() {
    if (this.message.text) {
      this.likedislikeModel.like = true;
      this.likedislikeModel.dislike = false;
      this.CallAPiLikeDislike();
    } else {
      this.authService.openLoginPopup(true);
    }

  }
  dislikeProfile() {
    if (this.message.text) {
      this.likedislikeModel.dislike = true;
      this.likedislikeModel.like = false;
      this.CallAPiLikeDislike();
    } else {
      this.authService.openLoginPopup(true);
    }
  }

  CallAPiLikeDislike() {
    this.httpClient.post(API_URL + 'client/addLikes', this.likedislikeModel)
      .subscribe((res) => {
        this.getProfile();
      });
  }
}

