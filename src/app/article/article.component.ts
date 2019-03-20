import { Component, OnInit } from '@angular/core';
import { MarkersService } from '../marker/markers.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
 
  constructor(private markers : MarkersService) { }

  test = "Voici une liste d'articles :";

  ngOnInit() {
   // console.log(this.markers.getMarkers());
    // this.getArticles();
  }

}
