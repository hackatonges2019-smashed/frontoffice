import { Injectable } from '@angular/core';
import { City } from './city.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private apiUrl = 'https://geo.api.gouv.fr/departements/';

  private params = "/communes?fields=nom,code,codesPostaux,centre&format=json&geometry=centre";

  // https://geo.api.gouv.fr/departements/92/communes?fields=nom,code,codesPostaux,centre,surface,codeDepartement,departement,codeRegion,region,population
  // &format=json
  // &geometry=centre
  
  constructor(private http:HttpClient) { }

  getData(dept): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl + dept + this.params);
  }
}
