import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';
import { UserService } from '../../../@core/data/users.service';
import { orderData } from '../../../common/array';

@Component({
  selector: 'ngx-news-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

  news: any;
  idNews: any;
  newsAnswer: any;
  contentUser: any;
  count: number;
  like: number;
  dislike: number;
  comment: any = {};
  denuncia: any = {};
  answer: any = {};
  commentById: any = [];
  connectionCom;
  connectionAns;
  siExUser = this.newsService.siExisteUser();

  constructor(

    private route: ActivatedRoute,
    private newsService: NewsService,
    private userService: UserService) {
    this.route.params.subscribe(val => {
      this.idNews = val.newsId;
      this.getNewsCommentById();
      this.getCommentWithUser();
      this.getNewsCommentCount();
      this.getNewsWithUser();
    });
  }
  ngOnInit() {
    this.connNews();
    this.ansNews();
  }

  userLogin() {
    return this.newsService.getUserId();
  }

  getNewsById(event) {
    this.newsService.getById(this.idNews).subscribe(data => {
      event.target.closest('nb-card').remove();
      data ? this.news = data : {};
    });
  }

  getNewsWithUser() {
    this.newsService.getUserByNews(this.idNews).subscribe(data => {
      data ? this.contentUser = data : {};
      orderData(this.contentUser);
      this.contentUser.fama.firsttwo = [];
      this.contentUser.fama.last = [];
      this.contentUser.fama.firsttwo = this.contentUser.fama.splice(0, 2);
      this.contentUser.fama.last = this.contentUser.fama.splice(0, this.contentUser.fama.length);
    });
  }

  connNews() {
    this.newsService.JoinComm(this.idNews);
    this.connectionCom = this.newsService.getNewsComen().subscribe(data => {
      const commData: any = data;
      this.commentById.push(data);
      this.getNewsCommentCount();
      this.getUserComm(commData.userId, this.commentById.length - 1);
    });
  }

  ansNews() {
    this.connectionAns = this.newsService.getNewsAns().subscribe(data => {
      const ComPosition = data['positionComment'];
      this.newsAnswer = data;
      if (this.commentById[ComPosition].res === undefined) {
        this.commentById[ComPosition].res = [];
      }
      this.commentById[ComPosition].res.push(data);
      this.getUserAnswer(ComPosition);
    });
  }

  getNewsCommentById() {
    this.newsService.getNewsComment(this.idNews).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        const commentId = this.commentById[index].id;
        this.getAnswer(commentId, index);
      });
    });
  }

  getCommentWithUser() {
    this.newsService.getNewsComment(this.idNews).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        const userByComment = this.commentById[index].userId;
        this.getUserComm(userByComment, index);
      });
    });
  }

  getUserComm(IdUser, index) {
    this.userService.getById(IdUser).subscribe(data => {
      this.commentById[index].user = [];
      this.commentById[index].user = data;
      orderData(this.commentById[index].user);
      this.commentById[index].user.fama.firsttwo = [];
      this.commentById[index].user.fama.firsttwo = this.commentById[index].user.fama.splice(0, 2);
    });
  }

  getAnswer(commentId, index) {
    this.newsService.getNewsAnswer(commentId).subscribe(data => {
      data.user = {};
      this.commentById[index].res = [];
      this.commentById[index].res = data;
      this.getUserAnswer(index);
    });
  }

  getUserAnswer(index) {
    this.commentById[index].res.forEach((element, index1) => {
      const userByAnswer = this.commentById[index].res[index1].userId;
      this.userService.getById(userByAnswer).subscribe(data => {
        this.commentById[index].res[index1].user = data;
        orderData(this.commentById[index].res[index1].user);
        this.commentById[index].res[index1].user.fama.firsttwo = [];
        this.commentById[index].res[index1].user.fama.firsttwo = this.commentById[index].res[index1].user.fama.splice(0, 2);
      });
    });
  }

  sendComment() {
    this.comment.noticiaId = this.idNews;
    this.newsService.postNewsComment(this.comment).subscribe(data => {
      this.comment = {};
    });
  }

  sendDenuncia() {
    this.denuncia.denunciadoId = this.news.usuarioId;
    this.newsService.postDenuncias(this.denuncia).subscribe(data => {
      this.denuncia = {};
    });
  }

  sendAnswer(event) {
    this.answer.noticiaId = this.idNews;
    this.answer.comentarioNoticiaId = event.id;
    this.answer.positionComment = event.name;
    this.answer.contenido = event.value;
    this.newsService.postNewsAnswer(this.answer).subscribe(data => {
    });
  }

  getNewsCommentCount() {
    this.newsService.getNewsCommentCount(this.idNews).subscribe(data => {
      this.count = data;
    });
  }

  sendLike() {
    this.newsService.postLikes(this.idNews).subscribe(data => {
      this.like = data;
      this.news = data;
    });
  }

  sendDislike() {
    this.newsService.postDislikes(this.idNews).subscribe(data => {
      this.dislike = data;
      this.news = data;
    });
  }

}
