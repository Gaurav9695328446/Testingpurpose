import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HomeService } from '../core/service/home.service';


@Component({
  selector: 'app-achivies',
  templateUrl: './achivies.component.html',
  styleUrls: ['./achivies.component.scss']
})
export class AchiviesComponent implements OnInit {
trendingProfile: any[] = [];

  constructor(private http: HttpClient,private homeservice: HomeService) { }

  ngOnInit() {
  	this.trendingProfilelist();
  }

   trendingProfilelist() {
    this.http.get('http://54.169.69.226:8090/api/v1/advertisement/all/1').subscribe((res) => {
      if (res && res['response'].length) {
        for (var i = 0; i < res['response'].length; i++) {
          this.trendingProfile.push(res['response'][i])
        }
        console.log(this.trendingProfile);
      }
    });
  }

}
