import { Component, OnInit } from '@angular/core';
import { HomeService } from '../core/service/home.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-hamare-netaji-kahen',
  templateUrl: './hamare-netaji-kahen.component.html',
  styleUrls: ['./hamare-netaji-kahen.component.scss']
})
export class HamareNetajiKahenComponent implements OnInit {

  imageSources: Array<any> = [];
  constructor(private homeServices: HomeService,private http: HttpClient) { }
  hamareNetaji: any[] = [];
  trendingProfile: any[] = [];

  ngOnInit() {
    this.trendingProfilelist();
    this.getHamareNetajiKahen();
    this.imageSources.push("https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg", "https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg");
  }

  getHamareNetajiKahen() {
    this.homeServices.getHamareNetajiKahen().subscribe(data => {
      if (data.status === 200) {

        this.hamareNetaji = data.body.humareNetajiKahein;

      }
    })
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
