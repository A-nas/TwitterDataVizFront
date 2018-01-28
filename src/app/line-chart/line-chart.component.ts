import {
  Component,
  OnChanges,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation
 } from '@angular/core';

import * as D3 from 'd3';
import { StatsService } from '../stats.service'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnChanges, AfterViewInit, OnInit {
  
  restructure(data){
    return data.map(function(d) {
        function type(d: any) {
        d = parseInt(d);
        d = new Date(d);
    
        var year = d.getFullYear();
        var month = d.getMonth()+1;
        var dt = d.getDate();
        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        d = year+'-' + month + '-'+dt;
        return d;
      }
       return { 'date' : type(d._id[0].$date.$numberLong) , 'close' : d.tweetCount };
      })
  }

  ngOnInit() {
   /* this.statsService.getNTweetByDay().subscribe(
      (response) => {this.data = this.restructure(response.json());console.log(this.data)},
      (error) => console.log(error)
    );*/
  }


  @ViewChild('container') element: ElementRef;

  private host;
  private svg;
  private margin;
  private width;
  private height;
  private xScale;
  private yScale;
  private xAxis;
  private yAxis;
  private htmlElement: HTMLElement;
  private data = [];

  curveArray = [
    {'curve': D3.curveLinear, 'curveTitle': 'curveLinear'},
    {'curve': D3.curveStep, 'curveTitle': 'curveStep'},
    {'curve': D3.curveStepBefore, 'curveTitle': 'curveStepBefore'},
    {'curve': D3.curveStepAfter, 'curveTitle': 'curveStepAfter'},
    {'curve': D3.curveBasis, 'curveTitle': 'curveBasis'},
    {'curve': D3.curveCardinal, 'curveTitle': 'curveCardinal'},
    {'curve': D3.curveMonotoneX, 'curveTitle': 'curveMonotoneX'},
    {'curve': D3.curveCatmullRom, 'curveTitle': 'curveCatmullRom'}
  ];

  selectedCurve = 'curveLinear';

  constructor(private statsService: StatsService) { }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.setup();
  }

  ngOnChanges(): void {
    this.setup();
  }

  onCurveChange(curve: string) {
    this.selectedCurve = curve;
    this.setup();
  }

  private setup(): void {
    // web service call
    this.statsService.getNTweetByDay().subscribe(
      //(response) => {this.data = response.json();console.log(this.data)},
      (response) => {this.data =  this.restructure(response.json());console.log(this.data)
      },
      (error) => console.log(error)
    );
    //console.log(this.data);

    this.margin = {top: 20, right: 20, bottom: 30, left: 50};
    this.width = 860 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
    this.xScale = D3.scaleTime().range([0, this.width]);
    this.yScale = D3.scaleLinear().range([this.height, 0]);
    this.buildChart();
  }

  private buildChart() {
    this.xAxis = D3.axisBottom(this.xScale);
    this.yAxis = D3.axisLeft(this.yScale);

    this.host.html('');

    let self = this;

    let line = D3.line()
      .curve(this.curveArray.find((item) => item.curveTitle === this.selectedCurve).curve || D3.curveLinear)
      .x(function(d: any) { return self.xScale(d.date); })
      .y(function(d: any) { return self.yScale(d.close); });

    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    //data.map(fucntion(<parameters>){})
    //D3.tsv('assets/testdata.tsv',this.type , function(error, data) { // this.date called for each iteration
    this.data.map(function(data){
      /*if (error) {
        throw error;
      }*/
      console.log("not yet here !!"); 
      self.xScale.domain(D3.extent(data, function(d: any) { return d.date; }));
      self.yScale.domain(D3.extent(data, function(d: any) { return d.close; }));

      self.svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + self.height + ')')
          .call(self.xAxis);

      self.svg.append('g')
          .attr('class', 'y axis')
          .call(self.yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Nombre de Tweets');

      self.svg.append('path')
          .datum(data)
          .attr('class', 'line')
          .attr('d', line);
    });
  }

  private type(d: any) {
    //console.log(year+'-' + month + '-'+dt);
    d.date = parseInt(d.date);
    d.date = new Date(d.date);

    var year = d.date.getFullYear();
    var month = d.date.getMonth()+1;
    var dt = d.date.getDate();
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    d.date = year+'-' + month + '-'+dt;

    d.close = +d.close;
    console.log('inside Type')
    console.log(d);
    return d;
  }
}
