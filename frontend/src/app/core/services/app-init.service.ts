import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AppInitService {

  constructor(private authService: AuthService) {}

  init() {
    return new Promise<void>((resolve) => {
      if (!this.authService.isLoggedIn()) {
        resolve();
        return;
      }

      // Refresh user from API on every app load
      this.authService.getMe().subscribe({
        next: (res: any) => {
          // Update localStorage with fresh user data from server
          localStorage.setItem('user', JSON.stringify(res));
          console.log('[AppInit] User preloaded:', res.name);
          resolve();
        },
        error: () => {
          // Token may be expired — clear and let guard handle redirect
          console.warn('[AppInit] Session expired, clearing auth');
          this.authService.logout();
          resolve();
        }
      });
    });
  }
}