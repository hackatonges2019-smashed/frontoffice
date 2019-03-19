import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { Map } from './map.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  test = "Voici une liste d'articles :";

  constructor(private mapService : MapService) { }

  articles: Map[];

  country= 'country=fr&';
  onClick(event) {
   // var target = event.target || event.srcElement || event.currentTarget;
   this.country = "country=" + event.target.id +"&";
   console.log("ONCLICK" + this.country);
   this.getArticles();
  }

  getArticles(): void {
    console.log("GETARTICLES : " + this.country);
    this.mapService.getData(this.country).subscribe(articles => {
      this.articles = articles;
    });
    
  }
  ngOnInit() {
    this.getArticles();
  }

}
