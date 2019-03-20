import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { CATEGORIES } from './mock-categories';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getCategories(): Observable<Category[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(CATEGORIES);
  }
}
