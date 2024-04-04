import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn=(
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
 ) => {
   const router:Router = inject(Router);
   const protectedRoutes:string[] = ['/carts','/user-profile'];
   const isTokenAvailable = localStorage && localStorage.getItem('token');

   return protectedRoutes.includes(state.url) && !isTokenAvailable
       ? router.navigate(['/login'])
       : true;
 }
