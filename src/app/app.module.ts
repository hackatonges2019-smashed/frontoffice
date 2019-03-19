import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from './article/article.service';
import { ArticleComponent } from './article/article.component';
import { MarkerComponent } from './marker/marker.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ArticleComponent,
    MarkerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
