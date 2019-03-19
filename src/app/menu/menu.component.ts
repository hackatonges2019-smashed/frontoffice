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
  }
  ngOnInit() {
    console.log("hey");
  }

}
