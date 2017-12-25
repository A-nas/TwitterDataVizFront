import { Component, OnInit } from '@angular/core';

import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition,
} from 'd3-ng2-service';

import { tsvParse } from 'd3-ng2-service/src/bundle-d3';

@Component({
  selector: 'app-linegraph',
  templateUrl: './linegraph.component.html',
  styleUrls: ['./linegraph.component.css']
})
export class LinegraphComponent implements OnInit {
  private d3: D3;

  constructor(d3Service: D3Service) { 
   this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    var svg = this.d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var parseTime = this.d3.timeParse("%d-%b-%y");
    var x = this.d3.scaleTime()
    .rangeRound([0, width]);
    
    var y = this.d3.scaleLinear()
    .rangeRound([height, 0]);
    
    var line = this.d3.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

    /*tsvParse("data.tsv", function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
      return d;
    }, function(error, data) {
      if (error) throw error;
    
      x.domain(this.d3.extent(data, function(d) { return d.date; }));
      y.domain(this.d3.extent(data, function(d) { return d.close; }));
    
      g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(this.d3.axisBottom(x))
        .select(".domain")
          .remove();
    
      g.append("g")
          .call(this.d3.axisLeft(y))
        .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Price ($)");
    
      g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);
    });*/

   /* var data = [
      {date: parseTime('24-Apr-07'), close: 100.81},
      {date: parseTime('1-May-07'), close: 110.81},
      {date: parseTime('22-Jun-07'), close: 150.81},
      {date: parseTime('24-Jul-07'), close: 99.81},
      {date: parseTime('24-Sep-07'), close: 71.81},
      {date: parseTime('24-Oct-07'), close: 80.81},
    ];
    
    data.map( function(d) {
      //d.date = parseTime(d.date);
      d.close = +d.close;
      return d;
    }, function(error, data) {
      if (error) throw error;
    
      x.domain(this.d3.extent(data, function(d) { return d.date; }));
      y.domain(this.d3.extent(data, function(d) { return d.close; }));
    
      g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(this.d3.axisBottom(x))
        .select(".domain")
          .remove();
    
      g.append("g")
          .call(this.d3.axisLeft(y))
        .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Price ($)");
    
      g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);
    });*/


  }

}
