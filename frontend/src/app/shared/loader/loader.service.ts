import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loadingCount = 0;
  loading$ = new BehaviorSubject<boolean>(false);

  show() {
    this.loadingCount++;
    this.loading$.next(true);
  }

  hide() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) this.loading$.next(false);
  }
}