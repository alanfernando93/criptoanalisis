import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Session } from '../../@core/data/session';
import { UserService } from "../../@core/data/users.service";
import { profileService } from '../profile.service';
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: "ngx-profile",
  styleUrls: ["./profile.component.scss"],
  templateUrl: "./profile.component.html",
  providers:[profileService]
})
export class ProfileComponent implements OnInit{
  user: any = {};
  news: any=[];
  newsUser: any;
  signals: any=[];
  transaction: any=[];
  name:string;
  show: number = 0;
  following: boolean=false;
  Me : boolean= false;

  constructor(
    private userService: UserService,
    private profileService: profileService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    route.params.subscribe(val=>{
      this.userService.getTotalInfo(val.id).subscribe(user=>{
        this.user=user;
        this.getnews();
        this.getsignals();
        this.getTransaccions();
        this.isFollow();
        this.IsMe();
      });
    });
  }

  ngOnInit() {
  }

  getNewsByUser(){
    this.userService.getNewsByUser(this.user.id).subscribe(data => {
      return this.newsUser = data;
    });
  }
  getnews(){
    let filter ='noticias?[filter][where][usuarioId]='+this.user.id+'&[filter][fields][id]=true&[filter][fields][titulo]=true&[filter][fields][fecha_create]=true';
    this.profileService.getmyNews(filter).subscribe(data=>{
      this.news=data;
    });
  }
  getsignals(){
    this.profileService.getmySignal(this.user.id).subscribe(data=>{
      this.signals=data;
    });
  }
  getTipo(id){
    if(id){
      return "compra de señal"
    } else {
      return "venta de señal"
    }
  }
  getTransaccions(){
    this.profileService.getmyTransaccions(this.user.id).subscribe(data=>{
      this.transaction=data;
      this.transaction.forEach((element, index)=>{
        var nameId = (element.senderId==this.user.id)? element.recieverId: element.senderId; 
        this.profileService.getsimpleuser(nameId)
        .subscribe(user=>{
          this.transaction[index].username=user.username;
        })
      })
    })
  }
  IsMe(){
    if(this.user.id==this.userService.getUserId())
      this.Me = true;
    else
     this.Me = false;
  }
  seguir(){
    this.userService.followUser(this.user.id)
    .subscribe(data=>{
      if(data.follow=='followed')
        this.following=true;
      else
        this.following=false;
    });
  }
  isFollow(){
    this.userService.isfollow(this.user.id)
    .subscribe(data=>{
      if(data.length>0)
        this.following=true;
      else
        this.following=false;
    })
  }
}