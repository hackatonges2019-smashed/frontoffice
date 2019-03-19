import { Injectable } from '@angular/core';
import { Map } from './map.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';



@Injectable({
  providedIn: 'root'
})
export class MapService {

  private apiUrl = 'https://newsapi.org/v2/top-headlines?';

  private apiKey = 'apiKey=d8586494ebb34fada0c12b3bd752cbb4';


  
  constructor(private http:HttpClient) { }

  getData(country): Observable<Map[]> {
    return this.http.get<Map[]>(this.apiUrl + country  + this.apiKey);
  }
}
