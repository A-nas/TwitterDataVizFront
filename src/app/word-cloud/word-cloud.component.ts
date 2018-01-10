import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { scaleLinear } from 'd3-ng2-service/src/bundle-d3';
import { Observer } from 'rxjs/Observer'
import {StatsService} from '../stats.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {
  selectedBy = 'Words'

  options: CloudOptions = { 
    width : 1000,
    height : 400,
    overflow: false,
  }

  data: CloudData[] = [] // empty words array

  setLog(returnedData :CloudData[]){ // transform to log scale
    for(var key in returnedData)
      returnedData[key].weight = Math.log(returnedData[key].weight);
    return returnedData;
  }

  restructure(data){ // remove nested word inside _id property
    return data.map(function(d) {
       return { 'text' : d._id.word , 'weight' : d.total_amount };
      })
  }

  restructureLog(data){ // remove nested word inside _id property
    return data.map(function(d) {
       return { 'text' : d._id.word , 'weight' : Math.log2(d.total_amount) };
      })
  }

  selectBy(str: string){
    this.selectedBy = str;
    this.ngOnInit();

  }

  newData(){
    console.log("clicked");
    const changedData$: Observable<CloudData[]> = Observable.of([
      {text: 'Anas', weight: 3 },
      {text: 'Anas', weight: 2, link: '#'},
      {text: 'Ananas', weight: 8, link: '#'},
      {text: 'Anas', weight: 10, link: '#'},
      {text: 'Anas', weight: 5, link: '#'},
    ]);
      changedData$.subscribe(
        res => this.data = res
      );
  }

  transform(scale:string){
    if(scale == 'log'){
      console.log('log scale data');
      // old code for test (dont remove it)
      /*const myObservable = Observable.create((observer: Observer<CloudData[]>) =>
      observer.next(this.setLog(this.data))
      );
      myObservable.subscribe(
        res => this.data = res
      );*/
    this.statsService.getTopTweets(this.selectedBy).subscribe(
        (response) => this.data = this.restructureLog(response.json()),
        (error) => console.log(error)
      );
    }else{
      this.statsService.getTopTweets(this.selectedBy).subscribe(
        (response) => this.data = this.restructure(response.json()),
        (error) => console.log(error)
      );
    }
  }

  wordClicked(clickinfo: CloudData){
    console.log(clickinfo);
    window.open(clickinfo.link);
  }
  
  constructor(private statsService: StatsService) {
  }

  ngOnInit() {
    this.statsService.getTopTweets(this.selectedBy).subscribe(
      (response) => this.data = this.restructure(response.json()),
      //{console.log(this.restructure(response.json()))},
      (error) => console.log(error)
    );
   
  }

}
