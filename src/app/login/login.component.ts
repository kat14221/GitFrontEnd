import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/medico']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
