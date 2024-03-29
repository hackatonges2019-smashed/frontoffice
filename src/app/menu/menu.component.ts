import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { Category } from "../categories/category.model";
import { CategoriesService } from '../categories/categories.service';
import { FormControl,ReactiveFormsModule, FormsModule } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  
  categories: Category[];
  
  categSearch = new FormControl();
  subcategories: Category[];
  active:any;

  constructor(private categoriesService: CategoriesService,private router: Router) { }

  clickCategory(category){
    
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

  search(event){
    if (event.key === "Enter") {
    this.router.navigate(['/map/search/',event.target.value]);
    }
  }
    
  ngOnInit() {
   
    this.categoriesService.getCategories().subscribe(cat => {
      this.categories = cat;
    });

  }

}
