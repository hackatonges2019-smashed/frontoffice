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

  getArticles(): void {
    this.mapService.getData().subscribe(articles => {
      this.articles = articles;
    });
    
  }
  ngOnInit() {
    this.getArticles();
  }

}
