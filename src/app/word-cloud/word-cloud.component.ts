import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { scaleLinear } from 'd3-ng2-service/src/bundle-d3';
import { Observer } from 'rxjs/Observer'

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {

  options: CloudOptions = { 
    width : 1000,
    height : 400,
    overflow: false,
  }

  data: CloudData[] = [
    {text: 'Weight-8-link-color', weight: 8, link: '#', color: '#ffaaee'},
    {text: 'Weight-25-link', weight: 10, link: 'https://google.fr'},
    {text: 'Weight-1-link', weight: 1, link: '#'},
    {text: 'Weight-2-link', weight: 2, link: '#'},
    {text: 'Weight-8-link', weight: 8, link: '#'},
    {text: 'Weight-10-link', weight: 10, link: '#'},
    {text: 'Weight-5-link', weight: 5, link: '#'},
  ]

  setLog(returnedData :CloudData[]){
    for(var key in returnedData)
      returnedData[key].weight = Math.log(returnedData[key].weight);
    return returnedData;
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
      const myObservable = Observable.create((observer: Observer<CloudData[]>) =>
      observer.next(this.setLog(this.data))
      );

      myObservable.subscribe(
        res => this.data = res
      );
    }else{
       console.log("call web service again");
    }
  }

  wordClicked(clickinfo: CloudData){
    console.log(clickinfo);
    window.open(clickinfo.link);
  }
  
  constructor() {
  }

  ngOnInit() {
  }

}
