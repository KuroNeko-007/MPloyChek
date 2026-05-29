import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RecordService } from '../../core/services/record.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any = null;
  records: any[] = [];
  isLoadingRecords = true;
  recordError = '';
  selectedDelay = 2000;

  constructor(
    private authService: AuthService,
    private recordService: RecordService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();

    this.authService.getMe().subscribe({
      next: (res: any) => {
        this.user = res;
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    this.loadRecords();
  }

  get identityItems() {
    return [
      { label: 'User ID',  value: this.user?.userId  || '—' },
      { label: 'Name',     value: this.user?.name     || '—' },
      { label: 'Email',    value: this.user?.email    || '—' },
      { label: 'Role',     value: this.user?.role     || '—' },
      { label: 'Records',  value: this.isLoadingRecords ? '…' : String(this.records.length) }
    ];
  }

  loadRecords() {
    this.isLoadingRecords = true;
    this.recordError = '';
    this.cdr.detectChanges();

    this.recordService.getRecords(this.selectedDelay).subscribe({
      next: (res: any) => {
        this.records = res;
        this.isLoadingRecords = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.recordError = 'Failed to load records.';
        this.isLoadingRecords = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToAdmin() { this.router.navigate(['/admin']); }
  logout()    { this.authService.logout(); }

  getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}