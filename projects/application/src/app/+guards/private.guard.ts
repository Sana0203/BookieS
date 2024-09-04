import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityService } from '../../../../infra-lib/src/public-api';
import { PageloaderService } from '../../../../infra-lib/src/lib/+services/+general/pageloader.service';

export const privateGuard: CanActivateFn = (route, state) => {
  let loader = inject(PageloaderService);
  let securityService = inject(SecurityService);
  let router = inject(Router);
  loader.loading = true;
  let result$ = securityService.canAccess();
  result$.subscribe(res=>{
    loader.loading = false;
    if (!res) {
      router.navigateByUrl('signin');
    }
    
  });
  return result$;
};
