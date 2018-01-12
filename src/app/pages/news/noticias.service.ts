import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class NoticiasService {
  private baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getNoticias() {
    return this.http.get(this.baseUrl + 'news').toPromise();
  }
}