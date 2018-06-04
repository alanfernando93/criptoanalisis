import { _GLOBAL } from '../../common/ConfigSettings';

export abstract class Session {

    getUserId() {
        return localStorage.getItem('userId')
    }

    getToken() {
        return localStorage.getItem('auth_app_token')
    }

    public getApiRest() {
        return _GLOBAL.apiUrl;
    }

    static getStorage(key) {
        return localStorage.getItem(key);
    }

    static setStorage(key, value) {
        localStorage.setItem(key, value);
    }

    static removeStorage(key) {
        localStorage.removeItem(key);
    }

    isAuth() {
        return (this.getUserId() && this.getToken()) ? true : false;
    }
}
