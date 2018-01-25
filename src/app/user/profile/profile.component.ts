import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UserService } from "../../@core/data/users.service";
import { UploadService } from "../upload.service";

@Component({
  selector: "ngx-profile",
  styleUrls: ["./profile.component.scss"],
  templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
  user: any = {};
  userId;
  token;

  form: FormGroup;
  loading: boolean = false;

  file: FormData;

  constructor(
    private userService: UserService,
    private uploadService: UploadService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ["image", Validators.required],
      avatar: null
    });
  }

  ngOnInit() {
    this.userId = Number.parseInt(localStorage.getItem("userId"));
    this.token = localStorage.getItem("auth_app_token");
    this.userService.getUser(this.userId, this.token).then(usuario => {
      this.user = JSON.parse(usuario["_body"]);
    });
  }

  private prepareSave() {
   this.file.append("name", this.form.get("name").value);
   this.file.append("avatar", this.form.get("avatar").value);
  }

  onSave() {
    this.userService.update(this.userId, this.token, this.user).then(resp => {
      // console.log(resp);
      this.prepareSave
      this.uploadService.makeFileRequest(this.file, this.userId, this.token).then((resp) => {
         console.log(resp)
      });
    });
  }

  fileChangeEvent(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file);
      this.form.get("avatar").setValue(file);
    }
  }
}
