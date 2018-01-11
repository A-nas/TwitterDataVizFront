import { Injectable, Inject } from '@angular/core'
import {Http} from '@angular/http'
@Injectable()
export class StatsService{

    constructor(private http: Http){}

    // get top 50 hashtag, mentions and words
    getTopTweets(str: string){
        return this.http.get('http://127.0.0.1:8000/topwords/'.concat(str));
        }

    getNTweetByDay(){
        return this.http.get('http://127.0.0.1:8000/toptweetperday');
    }
}