import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-trending-leaders',
  templateUrl: './trending-leaders.component.html',
  styleUrls: ['./trending-leaders.component.scss']
})
export class TrendingLeadersComponent implements OnInit {
  api_url = environment.API_URL;
  trendingProfile: any[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.trendingProfilelist();
  }

  trendingProfilelist() {
    this.httpClient.get(this.api_url + 'getTrendingProfiles').subscribe((res) => {

      if (res && res['profiles'].length) {
        for (var i = 0; i < res['profiles'].length; i++) {
          this.trendingProfile.push(res['profiles'][i])
        }
        console.log(this.trendingProfile);
      }
    });
  }

}
