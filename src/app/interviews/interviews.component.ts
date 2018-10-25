import { Component, OnInit } from '@angular/core';
import { InterviewsService } from '../core/service/interviews.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HomeService } from '../core/service/home.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
trendingProfile: any[] = [];
  imageSources: Array<any> = [];
  trandingInterviewsList: Array<any> = [];
  constructor(private interviewservice : InterviewsService,private http: HttpClient,private homeservice: HomeService) { }

  ngOnInit() {
    this.imageSources.push("https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg", "https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg");
    this.trendingInterviewlist();
    this.trendingProfilelist();
  }

  trendingInterviewlist() {
    this.interviewservice.getAllInterviewList().subscribe((res) => {
      console.log(res);
      this.trandingInterviewsList = res['interviews'];
    });
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
