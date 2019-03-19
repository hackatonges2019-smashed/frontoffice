import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { CitiesService } from '../article/cities.service';
import { DepartementService } from '../article/departement.service';
import { Article } from '../article/article.model';
import { City } from '../article/city.model';
import { Departement } from '../article/departement.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  test = "Voici une liste d'articles :";

  constructor(private articleService : ArticleService, private citiesService : CitiesService, private departementService : DepartementService) { }

  articles: Article[];
  department: Departement[];
  cities: City[];

  country= 'edition=fr-fr';

  onClick(event) {
   // var target = event.target || event.srcElement || event.currentTarget;
   this.country = "edition=" + event.target.id;
   console.log("ONCLICK : " + this.country);
   this.getCities();
   console.log(this.cities);
  }

  getArticles(): void {
    this.getCities();
    console.log("GETARTICLES : " + this.country);
    this.articleService.getData(this.country,"faits+divers+paris").subscribe(articles => {
      this.articles = articles;
    }); 
  }

  async getDepartement() {
    await this.departementService.getData().subscribe(department => {
      this.department = department;
    });
  }

  getCities(): void {
    this.getDepartement();
    console.log(this.department);
    for(let dept in this.department){
      console.log("GETCITIES for : " + dept);
      this.citiesService.getData(dept).subscribe(city => {
        console.log(city);
        this.cities = city;
      });
    }
    // return this.cities; 
  }

  ngOnInit() {
    // this.getCities();
    console.log("HERE !!")
    this.getDepartement();
    setTimeout(function () {
        console.log(this.department);
    }, 2500);
    
    // console.log(this.cities);
    // this.getArticles();
  }

}
