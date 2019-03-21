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

  getMarkers(keywords): Marker[] {
   // var target = event.target || event.srcElement || event.currentTarget;
   console.log("GETMARKERS : " + this.country);
   this.getArticles(keywords).then(
     () => {
       console.log("nb markers : " + this.markers.length);
       console.log("nb articles : " + this.articles.length);
       console.log("nb cities : " + this.cities.length);
       console.log("nb department : " + this.department.length);
       console.log("END ----");
   });
   return this.markers;
   // console.log(this.articles);
  }

  async getArticles(keywords) {
    await this.getCities().then(
      () => {
        let promisesArticle = [];
        console.log("CITIES. OK");
        console.log("GETARTICLES : " + this.country);
        // console.log(this.cities);
          for(let city=0; city < this.cities.length; city++){
            // console.log(this.cities[city]);
            if(this.cities[city].population > 25000){
            	
	            promisesArticle.push(new Promise ((resolve, reject) => {
	            	if(localStorage.getItem("articles_"+keywords+"_"+this.cities[city].nom)){
	            		let article = JSON.parse(localStorage.getItem("articles_"+keywords+"_"+this.cities[city].nom));
	            		this.articles = this.articles.concat(article);
	            		let marker = new Marker();
    					    marker.lat = this.cities[city].centre.coordinates[1];
    					    marker.lng = this.cities[city].centre.coordinates[0];
    					    marker.nom = this.cities[city].nom;
			            marker.articles = article;
		            	this.markers.push(marker);
	            	}else {
		              this.articleService.getData(this.country,keywords+"+"+this.cities[city].nom).subscribe(article => {
		                this.articles = this.articles.concat(article);
		                if(article['articles'].length > 0){
		                	let marker = new Marker();
					        marker.lat = this.cities[city].centre.coordinates[1];
					        marker.lng = this.cities[city].centre.coordinates[0];
					        marker.nom = this.cities[city].nom;
			               	marker.articles = article;
		            		this.markers.push(marker);
	       					localStorage.setItem("articles_"+keywords+"_"+this.cities[city].nom, JSON.stringify(article));
		                }
		                resolve(true);
		              });
		            }
	            }));
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

  clearMarkers(){
    this.markers = [];
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
