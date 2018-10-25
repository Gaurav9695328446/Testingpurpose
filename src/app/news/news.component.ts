import { Component, OnInit } from '@angular/core';
import { NewsService } from '../core/service/news.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HomeService } from '../core/service/home.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  trendingProfile: any[] = [];
imageSources: Array<any> = [];
  newsList: any[]=[];

  constructor(private news: NewsService,private http: HttpClient,private homeservice: HomeService) { }

  ngOnInit() {
    this.trendingProfilelist();
    this.imageSources.push("https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg", "https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg");
    this.trendingNewslist();
  }

  trendingNewslist() {
   
    /*this.news.getAllNewsList().subscribe((res) => {
      console.log(res);
      this.newsList = res['News'];
      //this.newsList=this.news.sample_json.response;
    });*/
    this.http.get('http://54.169.69.226:8090/api/v1/news').subscribe((res) => {
      if (res && res['response'].length) {
        for (var i = 0; i < res['response'].length; i++) {
          this.newsList.push(res['response'][i])
        }
        //console.log(this.trendingProfile);
      }
    });
  }

   trendingProfilelist() {
    this.http.get('http://54.169.69.226:8090/api/v1/advertisement/all/1').subscribe((res) => {
      if (res!=null && res['response'].length) {
        for (var i = 0; i < res['response'].length; i++) {
          this.trendingProfile.push(res['response'][i])
        }
       console.log(this.trendingProfile);
      }
    });
  }


}
