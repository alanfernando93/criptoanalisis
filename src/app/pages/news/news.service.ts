import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {
  private baseUrl = environment.apiUrl;
  private token = environment.usertoken;
  private userId = environment.userId;

  constructor(private http: Http) {

  }

  getAll() {
    return this.http.get(this.baseUrl + 'noticias')
      .map((res: Response) => res.json());
  }

  getById(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id)
      .map((res: Response) => res.json());
  }

  getNewsComment(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/comentarioNoticia')
      .map((res: Response) => res.json());
  }

  getNewsAnswer(commentId) {
    return this.http.get(this.baseUrl + 'comentario_noticia/' + commentId + '/answerNoticia')
      .map((res: Response) => res.json());
  }

  getNewsCommentCount(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/comentarioNoticia/count')
      .map((res: Response) => res.json());
  }

  getUserByNews(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/usuario')
      .map((res: Response) => res.json());
  }

  postNewsComment(id, comments) {
    return this.http.post(this.baseUrl + 'noticias/' + id + '/comentarioNoticia', comments)
      .map((res: Response) => res.json());
  }

  postNewsAnswer(id, answers) {
    return this.http.post(this.baseUrl + 'comentario_noticia/' + id + '/answerNoticia', answers)
      .map((res: Response) => res.json());
  }

  getUserById(id) {
    return this.http.get(this.baseUrl + 'usuarios/' + id)
      .map((res: Response) => res.json());
  }

  postDislikes(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/dislike?userId=' + this.userId)
      .map((res: Response) => res.json());
  }

  postLikes(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/like?userId=' + this.userId)
      .map((res: Response) => res.json());
  }

}