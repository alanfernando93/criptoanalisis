import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    let sw = true;
    var isAuth = JSON.parse(JSON.stringify(this.authService.isAuthenticated()));
    let token = isAuth['source'].value['token'];
    console.log(this.authService.isAuthenticated());
    if(token != null){      
      console.log(token);
      sw = true;
    }else{
      sw = false;
    }
    return sw;
      // .do(authenticated => {
      //   if (!authenticated) {
      //     this.router.navigate(['auth/login']);
      //   }
      // });

  }
}
