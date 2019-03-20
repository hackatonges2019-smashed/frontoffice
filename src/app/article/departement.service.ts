import { Injectable } from '@angular/core';
import { Departement } from './departement.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl = 'https://geo.api.gouv.fr/departements?fields=nom,code';

  // https://geo.api.gouv.fr/departements?fields=nom,code
  
  constructor(private http:HttpClient) { }

  getData(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }
}