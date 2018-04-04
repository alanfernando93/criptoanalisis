import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Session } from '../../@core/data/session'
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class NewsService extends Session{
  private baseUrl = environment.apiUrl;

  constructor(private http: Http) {
    super()
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

  insert(body) {
    body.usuarioId = this.getUserId();
    return this.http.post(this.baseUrl + 'noticias', body).map((res: Response) => res.json());
  }

  postNews(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/comment?userId' + this.getUserId())
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
    return this.http.get(this.baseUrl + 'noticias/' + id + '/dislike?userId=' + this.getUserId())
      .map((res: Response) => res.json());
  }

  postLikes(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/like?userId=' + this.getUserId())
      .map((res: Response) => res.json());
  }

  imageFileUpload(idNews,file){
    return this.http.post(this.baseUrl + 'noticias/' + idNews + '/upload',file)
      .map(resp => resp.json())
  }

  fullUploadFileImage(file){
    return this.http.post(this.baseUrl + 'Containers/galery/upload', file)
      .map(resp => resp.json())
  }

}