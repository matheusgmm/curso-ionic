import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  providers: [DatePipe]
})
export class CreateBookingComponent  implements OnInit {

  @Input() selectedPlace!: Place;
  endDateCtrl: any;
  startDateCtrl: any

  constructor(
    private modalCtrl: ModalController,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this.modalCtrl.dismiss({message: 'This is a dummy message!'}, 'confirm');
  }

  formatDate(event: CustomEvent, field: 'startDateCtrl' | 'endDateCtrl'): void {
    const selectedDate = event.detail.value;
    
    // Formata a data usando o pipe 'date'
    const formattedDate = this.datePipe.transform(selectedDate, 'dd/MM/yyyy');

    // Atribui a data formatada à variável correspondente (startDate ou endDate)
    this[field] = formattedDate;
  }

}
