import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  

  test = "Voici une liste d'articles :";

  constructor(private mapService : ArticleService) { }

  articles: Article[];

  country= 'edition=fr-fr';
  onClick(event) {
   // var target = event.target || event.srcElement || event.currentTarget;
   this.country = "edition=" + event.target.id;
   console.log("ONCLICK : " + this.country);
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
