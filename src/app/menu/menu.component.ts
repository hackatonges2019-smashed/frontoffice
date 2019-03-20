import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }


  clicked(){
    console.log("tu a cliqué");
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
    console.log("hey");
  }

}
