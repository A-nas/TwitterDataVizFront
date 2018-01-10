import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChartSwapperComponent } from './chart-swapper/chart-swapper.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { D3Service } from 'd3-ng2-service';
import { D3histoComponent } from './d3histo/d3histo.component';

import { TagCloudModule } from 'angular-tag-cloud-module';
import { LinegraphComponent } from './linegraph/linegraph.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HistographComponent } from './histograph/histograph.component'
// web service call
import { StatsService } from './stats.service'
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChartSwapperComponent,
    WordCloudComponent,
    D3histoComponent,
    LinegraphComponent,
    LineChartComponent,
    HistographComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(), // for the histogram
    TagCloudModule,
    HttpModule, // solve no provider for http!
  ],
  providers: [
    D3Service,
    StatsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
