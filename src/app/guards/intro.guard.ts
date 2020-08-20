import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isIntroShowed = await this.storage.get('isIntroShowed');
    if (isIntroShowed) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
      return false;
    }
  }
}
