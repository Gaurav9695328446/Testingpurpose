
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HomeService } from '../core/service/home.service';
import { SliderByScreenModule } from '../common/slider-by-screen/slider-by-screen.module';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  api_url = environment.API_URL;
  trendingProfile: any[] = [];
  trendingsectionAd: any[] = [];
  hamareNetajiKahen: any[] = [];
  trendingInterview: Array<any> = [];

  constructor(private http: HttpClient, private homeservice: HomeService) {
  }

  trendingProfilelist() {
    this.http.get(this.api_url + 'client/getTrendingProfiles').subscribe((res) => {
      if (res && res['profiles'].length) {
        for (var i = 0; i < res['profiles'].length; i++) {
          this.trendingProfile.push(res['profiles'][i])
        }
        console.log(this.trendingProfile);
      }
    });
  }

  getHamareNetajiKahen() {
    this.homeservice.getHamareNetajiKahen().subscribe(data => {
      if (data.status === 200) {
        if (data.body.humareNetajiKahein.length) {
          for (let i = 0; i < data.body.humareNetajiKahein.length; i++) {
            if (i === 2) {
              break;
            }
            this.hamareNetajiKahen.push(data.body.humareNetajiKahein[i]);
          }
        }
      }
    })
  }


  trendingInterviewlist() {
    this.homeservice.trendingInterviewlist().subscribe((res) => {
      console.log(res);
      this.trendingInterview = res["interviews"];
    });
  }

  ngOnInit() {
    this.trendingProfilelist();
    this.getHamareNetajiKahen();
    this.getSectionAdvertisement();
    this.trendingInterviewlist();
  }

  getSectionAdvertisement(){
     this.http.get('http://54.169.69.226:8090/api/v1/advertisement/all/2').subscribe((res) => {
      if (res!=null && res['response'].length) {
        for (var i = 0; i < res['response'].length; i++) {
          this.trendingsectionAd.push(res['response'][i])
        }
       // console.log(this.trendingProfile);
      }
    });
  }
}
