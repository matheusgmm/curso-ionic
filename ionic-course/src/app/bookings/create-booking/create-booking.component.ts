import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Input() selectedMode!:  'select' | 'random';
  @ViewChild('f', { static: true } ) form!: NgForm;

  endDateCtrl: any;
  startDateCtrl: any

  constructor(
    private modalCtrl: ModalController,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);

    if (this.selectedMode === 'random') {
      this.startDateCtrl = this.getRandomDate(availableFrom, availableTo);
      this.endDateCtrl = this.getRandomDate(new Date(this.startDateCtrl), new Date(availableTo));
    }
  }

  getRandomDate(start: Date, end: Date): string {
    // Gera uma data aleatória entre as datas de início e fim
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    return this.formatDateToISO(randomDate.toISOString());
  }


  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    if (!this.form.valid || !this.datesValid()) {
      return;
    }

    const bookingData = {
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: +this.form.value['guest-number'],
      startDate: this.form.value['date-from'],
      endDate: this.form.value['date-to']
    };

    this.modalCtrl.dismiss({ bookingData }, 'confirm');
  }

  formatDateToDisplay(date: string | null): string {
    return date !== null ? this.datePipe.transform(date, 'yyyy-MM-dd') || '' : '';
  }

  formatDateToISO(date: string | null): string {
    return date ? this.datePipe.transform(date, 'yyyy-MM-dd') || '' : '';
  }

  getMinDateForStartDateCtrl(): string | null {
    return this.startDateCtrl ? this.formatDateToISO(this.startDateCtrl) : null;
  }

  getMinDateForEndDateCtrl(): string | null {
    return this.startDateCtrl ? this.formatDateToISO(this.startDateCtrl) : null;
  }

  formatDate(event: CustomEvent, field: 'startDateCtrl' | 'endDateCtrl'): void {
    const selectedDate = event.detail.value;
    const formattedDate = this.formatDateToDisplay(selectedDate);
    const isoDate = this.formatDateToISO(selectedDate);
    this[field] = isoDate;

    this.form.controls[field === 'startDateCtrl' ? 'date-from' : 'date-to'].setValue(isoDate);
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

}
