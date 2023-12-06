import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [

    new Place(
      'p1', 
      'Manhattan Mansion', 
      'In the heart of New York City.',
       'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
       149.99
    ),
    new Place(
      'p2', 
      'L\'Amour Toujours', 
      'A romatic place in Paris!',
      'https://www.getyourguide.com/travel-guides/wp-content/uploads/2022/08/BCC-2022-PARIS-THINGS-TO-DO-AT-NIGHT-HEADER-Eiffel-Tower-at-night.webp',
      189.99
    ),
    new Place(
      'p3', 
      'The Foggy Palace', 
      'Not your average city trip!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/San_Francisco_with_two_bridges_the_fog_and_superior_mirage.jpg/800px-San_Francisco_with_two_bridges_the_fog_and_superior_mirage.jpg',
      99.99
    ),
  ];

  constructor() { }

  get places() {
    return [...this._places];
  }

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }
}
