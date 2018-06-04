import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";

import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { UserService } from "../../../@core/data/users.service";
import { AnalyticsService } from "../../../@core/utils/analytics.service";
import { overrideComponentView } from '@angular/core/src/view/entrypoint';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { HeaderService } from './header.service';

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
    { title: "Profile", link: "/user/profile/" + this.headerService.getUserId() },
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
    if(!this.userService.isAuth()) return;
      this.userService.getCurrentUser().subscribe(data => {
        this.user = data;
        this.user.totalFama = 0;
        this.user.fama.forEach(element => this.user.totalFama += element.valor);
      })
  }

  ngOnInit() {
    this.userService.connect();
    this.connection = this.userService.Request().subscribe(request => {
      this.req = request;
      this.setnotification(this.req.senderId, this.req.tipo);
    }, error => { });
    this.getNotifications();
    this.getsusc();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    return false;
  }

  getNotifications() {
    this.headerService.getNotifications().subscribe(data => {
      this.notifications = data;
      this.notifications.forEach((element, index) => {
        if (!element.status)
          this.notNum++;
        switch (element.tipo) {
          case 'request': {
            this.headerService.getUser(element.senderId).subscribe(user => {
              this.setcontent(user.username, this.msgReq, user.perfil, index);
            });
            break;
          }
          case 'news': {
            this.headerService.findNews(element.senderId).subscribe(news => {
              this.setcontent(news.tipo.moneda, news.titulo, null, index);
            });
            break;
          }
          case 'signal': {
            this.headerService.findsignal(element.senderId).subscribe(signal => {
              let content = (signal.signal.tipo) ? 'compra de señal' : 'publico una nueva señal';
              this.setcontent(signal.signal.usuario.username, content, signal.signal.usuario.perfil, index);
            });
            break;
          }
          case 'follow': {
            this.headerService.getUser(element.senderId).subscribe(user => {
              this.setcontent(user.username, 'empezo a seguirte', user.perfil, index);
            });
            break;
          }
          case 'likeNews': {
            this.headerService.getUser(element.emmiterId).subscribe(user => {
              this.setcontent(user.username, 'le gusto tu noticia', user.perfil, index);
            });
            break;
          }
          case 'likeSig': {
            this.headerService.getUser(element.emmiterId).subscribe(user => {
              this.setcontent(user.username, 'le gusto tu señal', user.perfil, index);
            });
            break;
          }
          case 'comNews': {
            this.headerService.getUser(element.emmiterId).subscribe(user => {
              this.setcontent(user.username, 'comento tu noticia', user.perfil, index);
            });
            break;
          }
          case 'comSig': {
            this.headerService.getUser(element.emmiterId).subscribe(user => {
              this.setcontent(user.username, 'comento tu señal', user.perfil, index);
            });
            break;
          }
        }
      });
    }, error => { });
  }

  setcontent(title: string, content: string, picture: string, index: number) {
    this.notifications[index].title = title;
    this.notifications[index].content = content;
    this.notifications[index].picture = picture;
  };

  setnotification(id: number, tipo: string) {
    var not;
    console.log(tipo, id);
    this.headerService.findnotif(tipo, id).subscribe(notif => {
      switch (tipo) {
        case 'request': {
          this.showToast('solicitud de chat', this.req.sender + this.msgReq);
          this.headerService.getUser(id).subscribe(user => {
            this.setnewContent('request', this.msgReq, user.username, user.id, user.perfil, notif[0].id);
          });
          break;
        }
        case 'news': {
          this.showToast(this.req.coin, this.req.title);
          this.setnewContent('news', this.req.title, this.req.coin, id, null, notif[0].id);
          break;
        }
        case 'signal': {
          this.headerService.findsignal(this.req.senderId).subscribe(sig => {
            let stat = (sig.signal.tipo) ? 'compra de señal' : 'publico una nueva señal'
            this.showToast(sig.signal.usuario.username, stat);
            this.setnewContent('signal', stat, sig.signal.usuario.username, id,
              sig.signal.usuario.perfil, notif[0].id);
          });
          break;
        }
        case 'follow': {
          this.headerService.getUser(this.req.senderId).subscribe(user => {
            this.showToast(user.username, 'empezo a seguirte');
            this.setnewContent('follow', 'empezo a seguirte', user.username, user.id,
              user.perfil, notif[0].id);
          });
          break;
        }
        case 'likeNews': {
          this.headerService.getUser(this.req.emmiterId).subscribe(user => {
            this.showToast(user.username, 'le gusto tu noticia');
            this.setnewContent('likeNews', 'le gusto tu noticia', user.username, this.req.senderId,
              user.perfil, notif[0].id);
          })
        }
        case 'likeSig': {
          this.headerService.getUser(this.req.emmiterId).subscribe(user => {
            this.showToast(user.username, 'le gusto tu Señal');
            this.setnewContent('likeSig', 'le gusto tu señal', user.username, this.req.senderId,
              user.perfil, notif[0].id);
          });
          break;
        }
        case 'comNews': {
          this.headerService.getUser(this.req.emmiterId).subscribe(user => {
            this.showToast(user.username, 'comento tu noticia');
            this.setnewContent('comNews', 'comento tu noticia', user.username, this.req.senderId,
              user.perfil, notif[0].id);
          });
          break;
        }
        case 'comSig': {
          this.headerService.getUser(this.req.emmiterId).subscribe(user => {
            this.showToast(user.username, 'comento tu Señal');
            this.setnewContent('comSig', 'comento tu señal', user.username, this.req.senderId,
              user.perfil, notif[0].id);
          });
          break;
        }
      }
    }, error => { });
    this.notNum++;
  }

  setnewContent(tipo: string, content: string, title: string, sender: number, picture: string, id: number) {
    let not = {
      tipo: tipo,
      content: content,
      title: title,
      senderId: sender,
      picture: picture,
      status: false,
      id: id
    };
    this.notifications.push(not)
  }

  seen(id: number) {
    var notif = this.notifications.find(not => not.id == id);
    switch (notif.tipo) {
      case 'request': {
        this.router.navigate(["/pages/chat"]);
        break;
      }
      case 'news': {
        this.router.navigate(["/pages/news/news-view/", notif.senderId])
        break;
      }
      case 'signal': {
        this.router.navigate(["/pages/signals/signals-view/", notif.senderId])
        break;
      }
      case 'follow': {
        this.router.navigate(["/user/profile/", notif.senderId]);
        break;
      }
      case 'likeNews': {
        this.router.navigate(["/pages/news/news-view/", notif.senderId])
        break;
      }
      case 'likeSig': {
        this.router.navigate(["/pages/signals/signals-view/", notif.senderId])
        break;
      }
      case 'comNews': {
        this.router.navigate(["/pages/news/news-view/", notif.senderId])
        break;
      }
      case 'comSig': {
        this.router.navigate(["/pages/signals/signals-view/", notif.senderId])
        break;
      }
    }
    if (!notif.status) {
      notif.status = true;
      this.notNum--;
      this.headerService.changeNotif(id).subscribe(data => {
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
      this.router.navigateByUrl("/auth/logout", { skipLocationChange: true }).then(r => {
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

  getlength() {
    return (this.notifications.length() > 0) ? true : false;
  }

  // habilitar suscripciones a canales noticias y señales usando el prefijo "sus" seguido del Id del usuario
  getsusc() {
    this.headerService.getSusc().subscribe(data => {
      this.susc = data;
      this.susc.forEach(element => {
        this.headerService.connect('sus' + element.posterId);
      });
    }, error => { });
  }
}
