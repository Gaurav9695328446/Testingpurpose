import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HomeService } from '../core/service/home.service';
	@Component
	({
		selector: 'app-upcoming-elections',
		templateUrl: './upcoming-elections.component.html',
		styleUrls: ['./upcoming-elections.component.scss']
	})
	export class UpcomingElectionsComponent implements OnInit
    {
		name:string;
		temp:string;
		assemblyname:string;
		public general:boolean =false;
		public assembly:boolean =true;
		public selectedItem:boolean=false;
		public itemInformation:boolean=false;
		trendingProfile: any[] = [];
		constructor(private http: HttpClient,private homeservice: HomeService) { }

			ngOnInit() {
				 this.trendingProfilelist();
					this.name="";
					
				}   
				
			setradio(e: string): void   
				{  
					
					this.name='-'+e;
					this.temp=this.name;
					this.selectedItem=false;
					this.itemInformation=false;
					if(e==='General Elections'){
						this.assembly=false;
						/*this.general=true;*/
						
					}
					else{
						this.assembly=true;
						/*this.general=false;*/
					}
					
				}       
				
			showData(getAssemeblyName:string)
				{
					this.name=this.temp+'-'+getAssemeblyName;
					this.showInnerElectionData(getAssemeblyName);

				}
				
			showInnerElectionData(InnerData:string){
					this.general=false;
					this.assembly=false;
					this.selectedItem=true;
					this.assemblyname=InnerData;
					this.itemInformation=false;
				}

			openMember(){
				this.general=false;
					this.assembly=true;
					this.selectedItem=false;
					this.itemInformation=false;
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
