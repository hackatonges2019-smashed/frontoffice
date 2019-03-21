import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';

import { ozae_key } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'https://api.ozae.com/gnw/articles?';

  private apiKey = 'key='+ozae_key.value;

  private currentDate = new Date();

  private dateNow: string = this.yyyymmdd(this.currentDate,0);

  private dateThreeMonthsAgo: string = this.yyyymmdd(this.currentDate,1);

  // CONTRY : edition=fr-fr
  // query=macron
  // hard_limit=20
  // https://api.ozae.com/gnw/articles?date=20180601__20180630&key=11116dbf000000000000960d2228e999&edition=fr-fr&query=mac
  
  constructor(private http:HttpClient) { }

  getData(country,keywords): Observable<Article[]> {
    // console.log(this.apiUrl + "date=" + this.dateThreeMonthsAgo + "__" + this.dateNow + "&" +this.apiKey +"&"+ country + "&query=" + keywords + "&hard_limit=10");
    // console.log(keywords);
    return this.http.get<Article[]>(this.apiUrl + "date=" + this.dateThreeMonthsAgo + "__" + this.dateNow + "&" +this.apiKey +"&"+ country + "&query=" + keywords + "&hard_limit=10");
  }

  yyyymmdd(date,year) {
    date.setFullYear(date.getFullYear()-year);
    var y = date.getFullYear().toString();
    var m = date.getMonth().toString();
    var d = date.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + m + d;
    return yyyymmdd;
  }
}
