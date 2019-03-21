import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { Category } from "../categories/category.model";
import { CategoriesService } from '../categories/categories.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // categories: Category[];
  categories: Observable<Category[]>;
  active:any;

  constructor(private categoriesService: CategoriesService) { }

  clickCategory(category){
    this.active = category;
  }
 
  clicked(){
    $('.transform').toggleClass('transform-active');

if($('.transform').hasClass('transform-active')){
    setTimeout(function(){ 
      $('.test').toggleClass('test-hide');
      $('.hide').toggleClass('visible');
  } , 1200);
  } else {
    setTimeout(function(){ 
      $('.test').toggleClass('test-hide');
      $('.hide').toggleClass('visible');
  } , 250);
  }
}
    
  ngOnInit() {
    // console.log("hey");
    this.categories = this.categoriesService.getCategories();
    console.log(this.categories);
  }

}
