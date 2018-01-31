import { Injectable, Inject } from '@angular/core'
import {Http} from '@angular/http'
@Injectable()
export class StatsService{

    constructor(private http: Http){}
    
    /**
     * get top 50 hashtag, mentions and words
     * str param can take as parameter {"Hashtag","Mention","Word"}
     * used in wordcloudComponent
     */
    getTopTweets(str: string){
        return this.http.get('http://127.0.0.1:8000/topwords/'.concat(str));
        }

    /**
     * get count of tweets by day
     * used in LineGraphComponent
     */
    getNTweetByDay(){
        return this.http.get('http://127.0.0.1:8000/toptweetperday');
    }

    getNTweetByYear(){
        return this.http.get('http://127.0.0.1:8000/toptweetperyear');
    }

    getNTweetByMonth(){
        return this.http.get('http://127.0.0.1:8000/toptweetpermonth');
    }
}