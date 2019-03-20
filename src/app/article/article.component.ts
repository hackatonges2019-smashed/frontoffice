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
  cities: City[] = [];

  country= 'edition=fr-fr';


  onClick(event) {
   // var target = event.target || event.srcElement || event.currentTarget;
   this.country = "edition=" + event.target.id;
   console.log("ONCLICK : " + this.country);
   this.getArticles().then(
     () => {
       console.log("nb articles : " + this.articles.length);
       console.log("nb cities : " + this.cities.length);
       console.log("nb department : " + this.department.length);
       console.log("END ----");
   });
   // console.log(this.articles);
  }

  async getArticles() {
    await this.getCities().then(
      () => {
        let promisesArticle = [];
        console.log("CITIES. OK");
        console.log("GETARTICLES : " + this.country);
        // console.log(this.cities);
          for(let city=0; city < this.cities.length; city++){
            // console.log(this.cities[city]);
            promisesArticle.push(new Promise ((resolve, reject) => {
              this.articleService.getData(this.country,"faits+divers+"+this.cities[city].nom).subscribe(article => {
                this.articles = article;
                resolve(true);
              });
            }));
          }
        return Promise.all(promisesArticle).then(function() {
            console.log("all articles loaded");
        });
      }
    );
    // this.articleService.getData(this.country,"faits+divers+paris").subscribe(articles => {
    //   this.articles = articles;
    // }); 
  }

  getDepartement() {
    return new Promise ((resolve, reject) => {this.departementService.getData().subscribe(department => {
        this.department = department;
        resolve(true);
      });
    });
  }

  async getCities() {
    await this.getDepartement().then(
        () => {
          let promises = [];
          console.log("DEPT. OK");
          // console.log(this.department);
          for(let dept=0; dept < this.department.length; dept++){
            promises.push(new Promise ((resolve, reject) => {
              this.citiesService.getData(this.department[dept].code).subscribe(city => {
                  this.cities = this.cities.concat(city);
                  resolve(true);
              });
            }));
          }
          return Promise.all(promises).then(function() {
              console.log("all cities loaded");
          });
        }
    );
    // return Promise.();
    // return this.cities; 
  }

  ngOnInit() {
    console.log("HERE 2 !!")
    // this.getArticles();
  }

}
