import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";

import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { UserService } from "../../../@core/data/users.service";
import { AnalyticsService } from "../../../@core/utils/analytics.service";
import { overrideComponentView } from '@angular/core/src/view/entrypoint';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { HeaderService} from './header.service';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {

  @Input() position = "normal";

  user: any = null;
  connection;
  config: ToasterConfig;
  req: any;
  notifications: any;
  notNum: number = 0;
  susc: any;
  msgReq = ' quiere conectarse contigo';
  userMenu = [
    { title: "Profile", link: "/user/profile" },
    { title: "Log out" }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private router: Router,
    private authService: NbAuthService,
    private toasterService: ToasterService,
    private headerService: HeaderService
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.getValue() && localStorage.length != 0) {
        let id = localStorage.getItem("userId")
        this.userService.getById(id).subscribe(resp=> this.user = resp)
      }
    });
  }

  ngOnInit() {    
    this.userService.connect();
    this.connection = this.userService.Request().subscribe(request =>{
      this.req = request;
      console.log(this.req);
          this.setnotification(this.req.senderId,this.req.tipo);
    });
    this.getNotifications();
    this.getsusc();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    return false;
  }
  getNotifications(){
    this.headerService.getNotifications().subscribe(data=>{
      this.notifications = data;
      this.notifications.forEach((element,index) => {
        if(!element.status)
           this.notNum++;
        switch(element.tipo){
          case 'request':{
            this.headerService.getUser(element.senderId).subscribe(user=>{
              this.notifications[index].title = user.username;
              this.notifications[index].picture = user.perfil;
              this.notifications[index].content = this.msgReq;
            });
            break;
          }
          case 'news':{
            this.headerService.findNews(element.senderId).subscribe(news=>{
              this.notifications[index].title = news.tipo_moneda;
              this.notifications[index].content = news.titulo;
            });
            break;
          }
          case 'signal':{
            this.headerService.findsignal(element.senderId).subscribe(signal=>{
              this.notifications[index].title = signal.signal.usuario.username;
              this.notifications[index].content = (signal.signal.tipo)?  'compra de señal': 'publico una nueva de señal';
              this.notifications[index].picture = signal.signal.usuario.perfil;
            });
            break;
          }
        }
      });
      console.log(this.notifications);
    });
  }
  setnotification(id: number, tipo: string){
     var not;
     this.headerService.findnotif(tipo,id).subscribe(notif=>{
       console.log('se obtuvo la notificacion',notif[0]);
       switch(tipo) {
        case 'request':{
          this.showToast('solicitud de chat', this.req.sender+this.msgReq);
          this.headerService.getUser(id).subscribe(user=>{
  
              not = {
                tipo: 'request',
                content: this.msgReq,
                title: user.username,
                senderId: user.id,
                status: false,
                picture: user.perfil,
                id:notif[0].id
              }
            this.notifications.push(not);
          });
          break;
        }
        case 'news':{
          this.showToast(this.req.coin,this.req.title);
          not ={
            tipo: 'news',
            content: this.req.title,
            title: this.req.coin,
            senderId: id,
            status: false,
            id:notif[0].id
          }
          this.notifications.push(not);
          break;
        }
        case 'signal':{
          this.headerService.findsignal(this.req.senderId).subscribe(sig=>{
            let stat = (sig.signal.tipo)? 'compra de señal': 'publico una nueva señal'
            this.showToast(sig.signal.usuario.username,stat);
            not = {
              tipo: 'signal',
              content: stat,
              title: sig.signal.usuario.username,
              senderId: id,
              picture: sig.signal.usuario.perfil,
              status: false,
              id:notif[0].id
            }
            this.notifications.push(not);
          });
          break;
        }
  
      }
     });
    this.notNum++;
    console.log(this.notifications);
  }
  seen(id: number){
    var notif = this.notifications.find(not=>not.id==id);
    switch(notif.tipo){
      case 'request':{
        this.router.navigate(["/pages/chat"]);
        break;
      }
      case 'news':{
        this.router.navigate(["/pages/news/view/",notif.senderId])
        break;
      }
      case 'signal':{
        this.router.navigate(["/pages/signals/view/",notif.senderId])
        break;
      }
    }
    if(!notif.status){
      notif.status=true;
      this.notNum--;
      this.headerService.changeNotif(id)
      .subscribe(data=>{
        console.log(data);
      })
    }
  };
  toggleSettings(): boolean {
    this.sidebarService.toggle(false, "settings-sidebar");
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent("startSearch");
  }

  logout() {
    this.userService.logout().subscribe(success => {
      this.router.navigateByUrl("/auth/logout", {skipLocationChange: true}).then(r => {
        localStorage.clear()
        this.router.navigate(["/pages/dashboard"])
      })
    })
  }

  signin() {
    this.router.navigate(["/auth/login"]);
  }

  signup() {
    this.router.navigate(["/auth/register"]);
  }
  private showToast(title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'fade',
      limit: 5,
    });
    const toast: Toast = {
      type: 'default',
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
  getlength(){
    if(this.notifications.length()>0)
      return true;
    else
      return false;
  }
  // habilitar suscripciones a canales noticias y señales usando el prefijo sus seguido del Id
  getsusc(){
    this.headerService.getSusc().subscribe(data=>{
      this.susc = data;
      this.susc.forEach(element => {
        this.headerService.connect('sus'+element.posterId);
      });
    });
  }
}
