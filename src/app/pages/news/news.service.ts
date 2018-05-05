import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Session } from '../../@core/data/session';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class NewsService extends Session{
  private baseUrl = environment.apiUrl;

  constructor(private http: Http, private socket: Socket) {
    super()
  }

  getAll() {
    return this.http.get(this.baseUrl + 'noticias')
      .map((res: Response) => res.json());
  }

  getNews(){
    let observable = new Observable(observer => {
      this.socket.on('insertNoti', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      } 
    });
    return observable;
  }

  getNewsComen(){
    let observable = new Observable(observer => {
      this.socket.on('newCom', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      } 
    });
    return observable;
  }

  getNewsAns(){
    let observable = new Observable(observer => {
      this.socket.on('newAns', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  getAllLimit(count, inc) {
    return this.http.get(this.baseUrl + 'noticias' + '?filter[order]=fecha_create%20DESC&filter[limit]=' + count +'&filter[skip]='+ inc)
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

  getNewsCount(){
    return this.http.get(this.baseUrl + 'news/' + 'count')
        .map(resp => resp.json());
  }
  
  getUserById(id) {
    return this.http.get(this.baseUrl + 'usuarios/' + id)
      .map((res: Response) => res.json());
  }

  postNewsComment(comments) {
    comments.userId = this.getUserId();
    return this.http.post(this.baseUrl + '/comentario_noticia', comments)
      .map((res: Response) => res.json());
  }

  postNewsAnswer(answers) {
    answers.userId = this.getUserId();
    return this.http.post(this.baseUrl + 'answer_noticia', answers)
      .map((res: Response) => res.json());
  }

  postNews(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/comment?userId' + this.getUserId())
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
  
  JoinComm(id){
    this.socket.emit("join", 'news'+id);
  }
  followUser(id){
    return this.http.post(this.baseUrl + 'followUsers/follow',{
      followerId: this.getUserId(),
      posterId: id
    })
    .map(resp => resp.json())
  }

  insert(body) {
    body.usuarioId = this.getUserId();
    return this.http.post(this.baseUrl + 'noticias', body)
    .map((res: Response) => res.json());
  }

}