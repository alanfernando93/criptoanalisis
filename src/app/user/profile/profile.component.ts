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
    if(localStorage.length != 0){
      let id = localStorage.getItem("userId")
      this.userService.getById(id).subscribe(resp => this.user =resp );
    }
  }


  onSave() {
    delete this.user.perfil;
    let body = new FormData();
    body.append('Key',this.user.username);
    body.append('Value', this.myFile);
    this.userService.update(this.user).subscribe(resp => {
      this.userService.imageFileUpload(body).subscribe((resp) => {
        this.router.navigate(['/']);
     });
    });

  }

  fileChangeEvent(files: any) {
    this.myFile = files[0];
    console.log(this.myFile);
  }
}
