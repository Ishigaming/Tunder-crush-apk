import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-birthdate',
  templateUrl: './birthdate.page.html',
  styleUrls: ['./birthdate.page.scss'],
  standalone: false,
})
export class BirthdatePage {
  year: string = '';
  month: string = '';
  day: string = '';
  birthdate: string = '';

  @ViewChild('monthInput') monthInput!: ElementRef;
  @ViewChild('dayInput') dayInput!: ElementRef;

  constructor(private router: Router, private alertCtrl: AlertController) {}

  goBack() {
    this.router.navigate(['/gender-selection']);
  }

  moveNext(event: any, nextField: string) {
    const value = event.target.value;
    const maxLength = event.target.maxLength;

    if (value.length >= maxLength) {
      const next = (this as any)[nextField];
      if (next && next.nativeElement) next.nativeElement.focus();
    }
  }

  isComplete(): boolean {
    return this.year.length === 4 && this.month.length === 2 && this.day.length === 2;
  }

  async continue() {
    const birthdate = `${this.year}-${this.month}-${this.day}`;
    const age = this.calculateAge(birthdate);

    if (isNaN(age)) {
      this.showAlert('Invalid date', 'Please enter a valid birthdate.');
      return;
    }

    if (age < 18) {
      this.showAlert('You must be 18+', 'You need to be at least 18 years old to use this app.');
      return;
    }

    if (age > 100) {
      this.showAlert('Invalid age', 'Please enter a realistic age.');
      return;
    }

    localStorage.setItem('birthdate', this.birthdate);
    localStorage.setItem('age', age.toString());

    console.log('Birthdate:', birthdate, 'Age:', age);
    this.router.navigate(['/passions']);
  }

  calculateAge(birthdate: string): number {
    const today = new Date();
    const birth = new Date(birthdate);

    if (isNaN(birth.getTime())) return NaN;

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    await alert.present();
  }
}
