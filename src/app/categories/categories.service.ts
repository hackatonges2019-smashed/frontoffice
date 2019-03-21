import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { CATEGORIES } from './mock-categories';
import { SUBCATEGORIES } from './mock-categories';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private api_cat = 'http://localhost:8080/categories';
  private api_subcat = 'http://localhost:8080/subcategories/';

  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]> {
    // TODO: send the message _after_ fetching the heroes
    // return of(CATEGORIES);
    return this.http.get<Category[]>(this.api_cat);
  }

  getSubCategories(idParent): Observable<Category[]> {
    // TODO: send the message _after_ fetching the heroes
    // return of(SUBCATEGORIES);
    return this.http.get<Category[]>(this.api_subcat + idParent);
  }
}
