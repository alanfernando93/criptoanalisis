export class Session {

    getUserId(){
        return localStorage.getItem('userId')
    }

    getToken(){
        return localStorage.getItem('auth_app_token')
    }
}