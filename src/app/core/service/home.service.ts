import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { consumeBinding } from '@angular/core/src/render3/instructions';

const API_URL = environment.API_URL;

@Injectable()
export class HomeService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getProfileByName(name): Observable<any> {

        const URL = API_URL + "client/searchProfile?keyword=" + name;
        return this.httpClient.get(URL, { observe: 'response' })
            .pipe(map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }

    getHamareNetajiKahen() {

        return this.httpClient.get(API_URL + 'client/getHumareNetajiKahein', { observe: 'response' }).
            pipe(map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }

    // getHamareNetajiKahen() {

    //     return this.httpClient.get(API_URL + 'admin/gethumarenetajikahein', { observe: 'response' }).
    //         pipe(map((res: HttpResponse<any>) => {
    //             return res;
    //         },
    //             error => {
    //                 return error;
    //             }));
    // }
    trendingInterviewlist() {
        return this.httpClient.get(API_URL + 'client/getTrendingInterviews');
    }
}
