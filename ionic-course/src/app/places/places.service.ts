import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, delay, map, of, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-angular-course-a528e-default-rtdb.firebaseio.com/offered-places.json'
      )
      .pipe(
        map((data) => {
          const places = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  data[key].title,
                  data[key].description,
                  data[key].imageUrl,
                  data[key].price,
                  new Date(data[key].availableFrom),
                  new Date(data[key].availableTo),
                  data[key].userId
                )
              );
            }
          }
          return places;
          // return [];
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.http
      .get<PlaceData>(
        `https://ionic-angular-course-a528e-default-rtdb.firebaseio.com/offered-places/${id}.json`
      )
      .pipe(
        map(placeData => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId

          )
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
    let generatedId: string;
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

    return this.http
      .post<{ name: string }>(
        'https://ionic-angular-course-a528e-default-rtdb.firebaseio.com/offered-places.json',
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((data) => {
          generatedId = data.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((places) => {
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }


      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        updatedPlaces = [...places];
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
        return this.http.put(
          `https://ionic-angular-course-a528e-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}

// new Place(
//   'p1',
//   'Manhattan Mansion',
//   'In the heart of New York City.',
//   'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
//   149.99,
//   new Date('2023-12-15'),
//   new Date('2023-12-20'),
//   'xyz'
// ),
// new Place(
//   'p2',
//   "L'Amour Toujours",
//   'A romatic place in Paris!',
//   'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
//   // 'https://www.getyourguide.com/travel-guides/wp-content/uploads/2022/08/BCC-2022-PARIS-THINGS-TO-DO-AT-NIGHT-HEADER-Eiffel-Tower-at-night.webp',
//   189.99,
//   new Date('2024-01-05'),
//   new Date('2024-01-15'),
//   'xyz'
// ),
// new Place(
//   'p3',
//   'The Foggy Palace',
//   'Not your average city trip!',
//   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/San_Francisco_with_two_bridges_the_fog_and_superior_mirage.jpg/800px-San_Francisco_with_two_bridges_the_fog_and_superior_mirage.jpg',
//   99.99,
//   new Date('2023-12-28'),
//   new Date('2023-12-31'),
//   'xyz'
// )
