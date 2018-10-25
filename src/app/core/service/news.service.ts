import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
	sample_json = {
		"response":[{
  "id" : 12345,
  "title" : "Hello",
  "description" : "Lorem ipsum hello ",
  "youtubeLink" : "https://www.youtube.com/embed/J1nARq8NraY&feature=youtu.be",
  "thumbnailUrl" : "https://www.youtube.com/embed/7y74ILL7tsc",
  "status" : true,
  "sequence" : 12345,
  "trending" : true
}]
}

  constructor(private httpClient: HttpClient) { }

  getAllNewsList() {
   /* return this.httpClient.get('' + 'client/getNews');*/
     return this.sample_json;
  }
}
