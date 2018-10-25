import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class InterviewsService {

	/*sample_json = {
		"response":[{
  "id" : 12345,
  "title" : "Hello",
  "description" : "Lorem ipsum hello ",
  "youtubeLink" : "http://hello",
  "thumbnailUrl" : "http://url",
  "status" : true,
  "sequence" : 12345,
  "trending" : true
}]
	}*/

  constructor(private httpClient: HttpClient) { }

  getAllInterviewList() {
    return this.httpClient.get(API_URL + 'client/getInterview');
   /* return this.sample_json;*/
  }
}
