import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
/*import { HttpClient, HttpHeaders } from '@angular/common/http';*/
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HomeService } from '../core/service/home.service';


const API_URL = environment.API_URL;


@Component({
  selector: 'app-home',
  templateUrl: './anninversary.component.html',
  styleUrls: ['./anninversary.component.scss'],

})
export class AnniversaryComponent implements OnInit {
 api_url = environment.API_URL;
  max: number = 5;
  rate: number = 0;
  isReadonly: boolean = true;
  loading: boolean = false;
  imageSources: Array<any> = [];
  isCollapsed = true;
  getMonth: any = new Date();
  anniversaryType: string = "all";
  monthArray: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  aniversaryTypeArray: object = {
    all: "All",
    birth: "Birth Anniversaries",
    marriage: "Wedding Anniversaries",
    death: "Death Anniversaries"
  };
   trendingProfile: any[] = [];
  anniversaryObj: any;

  constructor(private toastrService: ToastrService, private http: HttpClient,private homeservice: HomeService) { }
  ngOnInit() {

 this.trendingProfilelist();
    this.getMonth = this.getMonth.getMonth();
    this.getAnniversary(this.getMonth, this.anniversaryType);
    console.log(new Date());
    /*this.pushData();*/
    this.imageSources.push("https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg", "https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg");
   
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

 /* pushData(){







  }*/

  aniversaryTypeArrayKeys() {
    return Object.keys(this.aniversaryTypeArray);
  }

  getAnniversary(month, anninversaryType) {
    this.getMonth = month;
    this.anniversaryType = anninversaryType;
    month = this.monthArray[month].toLowerCase();

    return this.http.get(API_URL + `account/getAnniversaries?month=${month}&type=${anninversaryType}`).subscribe(result => {
      this.loading = false;

      console.log(result);
      if (result["anniversaries"].length >= 0) {
        this.anniversaryObj = result["anniversaries"];

      } else {
        this.toastrService.error(result['message'], "Error");
      }
    }, error => {
      this.loading = false;
      this.toastrService.error("something went wrong", "Error");

    });
  }

}
