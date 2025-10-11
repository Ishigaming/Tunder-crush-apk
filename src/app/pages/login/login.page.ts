import { Component, OnInit } from '@angular/core';
import { Auth }  from 'src/app/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email = ''; 
  password = '';

  constructor(private auth: Auth, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    try {
      await this.auth.login(this.email, this.password);
      alert('✨ ¡Bienvenido de nuevo a Tunder!')
      this.router.navigate(['/home']);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  }
}
