import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = { userId: '', password: '' };
  errorMessage = '';
  isLoading = false;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.redirectByRole(this.authService.getRole());
    }
  }

  fillDemo(userId, password) {
    this.formData.userId = userId;
    this.formData.password = password;
    this.errorMessage = '';
  }

  onLogin() {
    this.errorMessage = '';
    if (!this.formData.userId || !this.formData.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.isLoading = true;
    this.authService.login(this.formData).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.redirectByRole(res.user.role);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed. Try again.';
      }
    });
  }

  redirectByRole(role) {
    if (role === 'Admin') this.router.navigate(['/admin']);
    else this.router.navigate(['/dashboard']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}