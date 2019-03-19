import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { Article } from '../article/article.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title: string = 'My first AGM project';
  defaultlat: "56.678418";
  defaultlng: "6.809007";
  positions: Array<{lat: string, lng: string}> = [
    {lat:"51.678418", lng: "7.809007"},
    {lat:"55.678418", lng: "3.809007"},
  ];
  
  

  constructor() { }

  // onClick(event) {
  //  // var target = event.target || event.srcElement || event.currentTarget;
  //  this.country = "country=" + event.target.id +"&";
  //  console.log("ONCLICK" + this.country);
  //  this.getArticles();
  // }

  // getArticles(): void {
  //   console.log("GETARTICLES : " + this.country);
  //   this.mapService.getData(this.country).subscribe(articles => {
  //     this.articles = articles;
  //   });
    
  // }
  ngOnInit() {
    console.log(this.positions);
    // this.getArticles();
  }


}
