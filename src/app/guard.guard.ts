import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }


  /**
   * Checks if the user is authenticated and can activate a route.
   * 
   * @param {ActivatedRouteSnapshot} next - The next activated route snapshot. 
   * @param {RouterStateSnapshot} state - The current router state snapshot. 
   * @returns {Observable<boolean> | Promise<boolean> | boolean} - An Observable, Promise, 
   * or boolean indicating whether the user is authenticated and can activate the route. 
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn !== true) {
      this.router.navigate(['']);
    }
    return true;
  }
}
