import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { AdminCountPipe, GeneralCountPipe } from '../../shared/pipes/user-count.pipe';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminCountPipe, GeneralCountPipe],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentUser: any = null;
  users: any[] = [];
  isLoadingUsers = true;
  usersError = '';

  showAddForm = false;
  isSubmitting = false;
  formError = '';
  formSuccess = '';

  newUser = {
    userId: '',
    name: '',
    email: '',
    password: '',
    role: 'General User'
  };

  deleteTargetId = '';
  isDeleting = false;
  showDeleteConfirm = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.loadUsers();
  }

selectedDelay = 2000;

loadUsers() {
  this.isLoadingUsers = true;
  this.usersError = '';
  this.cdr.detectChanges();

  this.userService.getAllUsers(this.selectedDelay).subscribe({
    next: (res: any) => {
      this.users = res;
      this.isLoadingUsers = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.usersError = 'Failed to load users.';
      this.isLoadingUsers = false;
      this.cdr.detectChanges();
    }
  });
}

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.formError = '';
    this.formSuccess = '';
    this.resetForm();
    this.cdr.detectChanges();
  }

  resetForm() {
    this.newUser = { userId: '', name: '', email: '', password: '', role: 'General User' };
  }

  onAddUser() {
    this.formError = '';
    this.formSuccess = '';

    const { userId, name, email, password } = this.newUser;

    if (!userId || !name || !email || !password) {
      this.formError = 'All fields are required.';
      this.cdr.detectChanges();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.formError = 'Please enter a valid email address.';
      this.cdr.detectChanges();
      return;
    }

    if (password.length < 6) {
      this.formError = 'Password must be at least 6 characters.';
      this.cdr.detectChanges();
      return;
    }

    this.isSubmitting = true;
    this.cdr.detectChanges();

    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.formSuccess = `User "${this.newUser.name}" created successfully.`;
        this.resetForm();
        this.cdr.detectChanges();
        this.loadUsers();
        setTimeout(() => {
          this.formSuccess = '';
          this.showAddForm = false;
          this.cdr.detectChanges();
        }, 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.formError = err.error?.message || 'Failed to create user.';
        this.cdr.detectChanges();
      }
    });
  }

  confirmDelete(userId) {
    this.deleteTargetId = userId;
    this.showDeleteConfirm = true;
    this.cdr.detectChanges();
  }

  cancelDelete() {
    this.deleteTargetId = '';
    this.showDeleteConfirm = false;
    this.cdr.detectChanges();
  }

  onDeleteUser() {
    if (!this.deleteTargetId) return;

    this.isDeleting = true;
    this.cdr.detectChanges();

    this.userService.deleteUser(this.deleteTargetId).subscribe({
      next: () => {
        this.isDeleting = false;
        this.showDeleteConfirm = false;
        this.deleteTargetId = '';
        this.cdr.detectChanges();
        this.loadUsers();
      },
      error: () => {
        this.isDeleting = false;
        this.showDeleteConfirm = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
  }

  getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getRoleClass(role) {
    return role === 'Admin' ? 'badge-admin' : 'badge-user';
  }

  isSelf(userId) {
    return this.currentUser?.userId === userId;
  }
}