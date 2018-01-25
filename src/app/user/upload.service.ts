import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class UploadService {

    baseUrl: String;

    constructor(private http: Http) {
        this.baseUrl = environment.apiUrl;
    }

    makeFileRequest(file: any, id, token: String) {
        return this.http.post(this.baseUrl + "usuarios/" + id + "/upload?access_token=" + token, file).toPromise();
    }

}