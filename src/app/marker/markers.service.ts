import { Injectable } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { CitiesService } from '../article/cities.service';
import { DepartementService } from '../article/departement.service';
import { Article } from '../article/article.model';
import { Marker } from './marker.model';
import { City } from '../article/city.model';
import { Departement } from '../article/departement.model';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  constructor(private articleService : ArticleService, private citiesService : CitiesService, private departementService : DepartementService) { }

  private country= 'edition=fr-fr';

  private articles: Article[] = [];
  private department: Departement[];
  private cities: City[] = [];
  private markers: Marker[] = [];

  getMarkers() {
   // var target = event.target || event.srcElement || event.currentTarget;
   console.log("GETMARKERS : " + this.country);
   this.getArticles().then(
     () => {
       console.log("nb markers : " + this.markers.length);
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
            if(this.cities[city].population > 50000){
            	let marker = new Marker();
            	marker.lat = this.cities[city].centre.coordinates[0];
            	marker.lng = this.cities[city].centre.coordinates[1];
	            promisesArticle.push(new Promise ((resolve, reject) => {
	              this.articleService.getData(this.country,"faits+divers+"+this.cities[city].nom).subscribe(article => {
	                this.articles = this.articles.concat(article);
	                marker.articles = article;
	                resolve(true);
	              });
	            }));
            	this.markers.push(marker);
            }
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
}
