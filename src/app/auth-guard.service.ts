import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // let sw = true;
    var isAuth = JSON.parse(JSON.stringify(this.authService.isAuthenticated()));
    // console.log(state);
    
    let token = isAuth['source'].value['token'];
    if (token == null) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
    } 
    return true;
    // .do(authenticated => {
    //   if (!authenticated) {
    //     this.router.navigate(['auth/login']);
    //   }
    // });

  }
}
