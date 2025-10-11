import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  userData = {
    name: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    country: '',
    photos: []
  };

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {}

  register() {
    if (!this.userData.name || !this.userData.email || !this.userData.password) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    localStorage.setItem('tempUser', JSON.stringify(this.userData));

    this.router.navigate(['/gender-selection']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
