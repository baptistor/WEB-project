import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(TokenStorageService);

  if (!service.isLogged()) {
    console.log("NotAuthGuard : true");
    return true;  
  }

  console.log("NotAuthGuard : false");
  router.navigateByUrl('/users');  
  return false;  
};