import { Component, OnInit ,Directive} from '@angular/core';
import { ArticleService } from '../article/article.service';
import { Article } from '../article/article.model';
import { Marker } from '../marker/marker.model';
import { MarkersService } from '../marker/markers.service';
import { ActivatedRoute,Router, NavigationExtras } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title: string = 'My first AGM project';
  defaultlat: number = 47.454148;
  defaultlng: number = 2.481905;
  positions: Marker[];
  

  icons = {
    icon: '/assets/img/rond.png',
    }

  public customStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "saturation": 36
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "stylers": [
        {
          "color": "#4d4d4d"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "stylers": [
        {
          "weight": 3
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#949494"
        },
        {
          "visibility": "simplified"
        },
        {
          "weight": 3
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "stylers": [
        {
          "color": "#4d4d4d"
        },
        {
          "weight": 3
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#4b4b4b"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#323232"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#4b4b4b"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "color": "#ff0080"
        },
        {
          "visibility": "simplified"
        },
        {
          "weight": 3
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4d4d4d"
        },
        {
          "lightness": 15
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];

  constructor(private markers : MarkersService,private router:Router, private route: ActivatedRoute) { }


  ngOnInit() {
    
    

        
    this.route.params.subscribe(data  =>{
      
      // let id : number = Number(this.route.snapshot.paramMap.get('id'));
      // let letter : string = String(this.route.snapshot.paramMap.get('id'));
      // let filter : string = String(this.route.snapshot.paramMap.get('id'));
      let a :any   = this.route.snapshot.paramMap.get('nom');
      console.log("YEAH:" + this.router.url);
      console.log("redg "+a);
      if(this.router.url === '/map/'+a){
        this.markers.clearMarkers();
        // console.log($('ul.categories li:nth-child('+a +')'));
        // $('ul.categories li').addClass('selected');
        this.positions = this.markers.getMarkers(a);
        console.log(a + " : " +this.positions);
        
      // } else if(this.router.url === '/employeelist/search/'+filter) {

      //   let x = sessionStorage.getItem('x');
      //   this.employees$ = this.employeeListService.searchEmployees(filter,JSON.parse(x));
      } 
      else {
        this.positions = this.markers.getMarkers("faits+divers");
      }
   
    });
  }
  
}
