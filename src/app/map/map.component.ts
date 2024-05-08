import {Component, OnInit} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {environment} from "../service/enviroment";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  ngOnInit(): void {
    const map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [12.550343, 41.897545], // [long, lat]
      zoom: 12
    });

    // Aggiungi eventuali altri strati o marker sulla mappa qui
  }
}

