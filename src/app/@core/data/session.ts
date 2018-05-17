import { environment } from "../../../environments/environment";
import { Http } from '@angular/http'

export abstract class Session {

    constructor(){
    }

    getUserId(){
        return localStorage.getItem('userId')
    }

    getToken(){
        return localStorage.getItem('auth_app_token')
    }

    public getApiRest() {
        return environment.apiUrl;
    }

    isAuth(){
        if (this.getUserId() && this.getToken()) {
            return true;
        }else{
            return false;
            // this.router.navigate(["/auth/login"]);
        }
    }
}
