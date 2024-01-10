import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[] = [];
  listedLoadedPlaces: Place[] = [];
  relevantPlaces: Place[] = [];
  private placesSub: Subscription = new Subscription();
  isLoading: boolean = false;

  chosenFilter: string = '';


  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    })

    this.chosenFilter = 'all';
    this.setPlacesByFilter(this.chosenFilter);
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }



  setPlacesByFilter(chosenFilter: string) {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      if (chosenFilter === 'all') {
        this.relevantPlaces = this.loadedPlaces;
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      } else {
        this.relevantPlaces = this.loadedPlaces.filter(
          (place) => place.userId !== this.authService.userId
        );
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      }
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
    this.chosenFilter = String(event.detail.value);
    this.setPlacesByFilter(this.chosenFilter);
  }


  // onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
  //   console.log(event.detail);
  //   if (event.detail.value === 'all') {
  //     this.relevantPlaces = this.loadedPlaces;
  //     this.listedLoadedPlaces = this.relevantPlaces.slice(1);
  //   } else {
  //     this.relevantPlaces = this.loadedPlaces.filter(
  //       place => place.userId !== this.authService.userId
  //     );
  //     this.listedLoadedPlaces = this.relevantPlaces.slice(1);
  //   }
  // }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
