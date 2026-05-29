import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../shared/loader/loader.service';
import { AuthService } from '../services/auth.service';

const SILENT_URLS = ['/api/records', '/api/users'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const authService   = inject(AuthService);

  const token = authService.getToken();
  const isSilent = SILENT_URLS.some(url => req.url.includes(url));

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  if (!isSilent) loaderService.show();

  return next(authReq).pipe(
    finalize(() => {
      if (!isSilent) loaderService.hide();
    })
  );
};