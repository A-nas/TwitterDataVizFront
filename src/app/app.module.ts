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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChartSwapperComponent,
    WordCloudComponent,
    D3histoComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(), // for the histogram
    TagCloudModule
  ],
  providers: [
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
