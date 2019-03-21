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
  categories: Category[];
  subcategories: Category[];
  active:any;

  constructor(private categoriesService: CategoriesService) { }

  clickCategory(category){
    // console.log(this.categories);
    this.active = category;
    this.populateSubCategories(category.id);
  }

  populateSubCategories(id){
    this.categoriesService.getSubCategories(id).subscribe(cat => {
      this.subcategories = cat;
    });
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
    this.categoriesService.getCategories().subscribe(cat => {
      this.categories = cat;
    });
  }

}
