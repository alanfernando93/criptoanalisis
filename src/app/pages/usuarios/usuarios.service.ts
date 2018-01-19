import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsuariosService {
    
    private baseUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }
    

}
