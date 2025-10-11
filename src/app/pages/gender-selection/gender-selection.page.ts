import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender-selection',
  templateUrl: './gender-selection.page.html',
  styleUrls: ['./gender-selection.page.scss'],
  standalone: false,
})
export class GenderSelectionPage implements OnInit {

  selectedGender: string | null = null;
  showGender = false;

  constructor(private router: Router) { }

  ngOnInit() {
     const tempUser = JSON.parse(localStorage.getItem('tempUser') || '{}');
    if (tempUser.gender) {
      this.selectedGender = tempUser.gender;
      this.showGender = tempUser.showGenderProfile || false;
   }
  }

  selectGender(gender: string) {
    this.selectedGender = gender;
  }

  goBack() {
    this.router.navigate(['/register']);
  }

  continue() {
    if (!this.selectedGender) {
      alert('Por favor selecciona un género antes de continuar.');
      return;
    }

    const tempUser = JSON.parse(localStorage.getItem('tempUser') || '{}');
    tempUser.gender = this.selectedGender;
    tempUser.showGenderProfile = this.showGender;
    localStorage.setItem('tempUser', JSON.stringify(tempUser));

    this.router.navigate(['/birthdate']); 
  }

}
