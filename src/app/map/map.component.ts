import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { Article } from '../article/article.model';
import { Marker } from '../marker/marker.model';
import { MarkersService } from '../marker/markers.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title: string = 'My first AGM project';
  defaultlat = "56.678418";
  defaultlng = "6.809007";
  positions: Marker[];
  
  

  constructor(private markers : MarkersService) { }

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
  getPositions(){

  }

  ngOnInit() {
    this.positions = this.markers.getMarkers();
    // console.log(this.positions);
    // this.getArticles();
  }


}
