import { Injectable } from '@angular/core';
import { Map } from './map.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';



@Injectable({
  providedIn: 'root'
})
export class MapService {

  private apiUrl = 'https://api.ozae.com/gnw/articles?';

  private apiKey = 'key=11116dbf000000000000960d2228e999';

  private date = "date=20180601__20180630";

  // CONTRY : edition=fr-fr
  // query=macron
  // hard_limit=20
  // https://api.ozae.com/gnw/articles?date=20180601__20180630&key=11116dbf000000000000960d2228e999&edition=fr-fr&query=mac
  
  constructor(private http:HttpClient) { }

  getData(country): Observable<Map[]> {
    console.log(country);
    return this.http.get<Map[]>(this.apiUrl + this.date +"&" +this.apiKey +"&"+ country + "&query=faits+divers+paris&hard_limit=200");
  }
}
