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
      console.log(request);
          this.showToast('solicitud de chat', this.req.sender + 'quiere conectarse');
          this.setnotification(this.req.idSender,this.req.tipo);
    });
    this.getNotifications();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    return false;
  }
  getNotifications(){
    this.headerService.getNotifications().subscribe(data=>{
      console.log(data);
      this.notifications = data;
      this.notifications.forEach((element,index) => {
        this.headerService.getUser(element.senderId).subscribe(user=>{
          this.notifications[index].username = user.username;
          this.notifications[index].picture = user.perfil;
        });
        if(element.tipo == 'request')
          this.notifications[index].tipo = 'quiere conectarse contigo'
      });
    });
  }
  setnotification(id: number, tipo: string){
    if(tipo=='request'){
      this.headerService.getUser(id).subscribe(user=>{
        let not = {
          tipo: 'quieres conectarse contigo',
          username: user.username,
          usuarioId: user.id,
          picture: user.perfil,
        }
      this.notifications.push(not);
      });
    }
  }
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
}
