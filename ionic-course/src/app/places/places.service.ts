import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, delay, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      149.99,
      new Date('2023-12-15'),
      new Date('2023-12-20'),
      'xyz'
    ),
    new Place(
      'p2',
      "L'Amour Toujours",
      'A romatic place in Paris!',
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      // 'https://www.getyourguide.com/travel-guides/wp-content/uploads/2022/08/BCC-2022-PARIS-THINGS-TO-DO-AT-NIGHT-HEADER-Eiffel-Tower-at-night.webp',
      189.99,
      new Date('2024-01-05'),
      new Date('2024-01-15'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/San_Francisco_with_two_bridges_the_fog_and_superior_mirage.jpg/800px-San_Francisco_with_two_bridges_the_fog_and_superior_mirage.jpg',
      99.99,
      new Date('2023-12-28'),
      new Date('2023-12-31'),
      'abc'
    ),
  ]);

  constructor(private authService: AuthService) {}

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo, 
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
