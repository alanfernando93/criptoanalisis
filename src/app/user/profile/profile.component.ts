import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UserService } from "../../@core/data/users.service";

@Component({
  selector: "ngx-profile",
  styleUrls: ["./profile.component.scss"],
  templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
  user: any = {};

  name:string;
  myFile:File;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getUser().then(usuario => {
      this.user = JSON.parse(usuario["_body"]);
    });
  }


  onSave() {
    delete this.user.profile;
    let body = new FormData();
    body.append('Key',this.user.username);
    body.append('Value', this.myFile);
    // console.log(this.user);
    this.userService.update(this.user).then(resp => {
      // console.log(resp);
      this.userService.makeFileRequest(body).then((resp) => {
        // console.log(resp)
        this.router.navigate(['/user/profile']);
     });
    });

  }

  fileChangeEvent(files: any) {
    this.myFile = files[0];
  }
}
