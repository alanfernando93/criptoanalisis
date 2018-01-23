import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../@core/data/users.service';
import { UploadService } from '../upload.service';

@Component({
   selector: 'ngx-profile',
   styleUrls: ['./profile.component.scss'],
   templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {

   user: any = {};
   userId;
   token;

   form: FormGroup;
   loading: boolean = false;

   filesToUpload: Array<File>;

   constructor(
      private userService: UserService,
      private uploadService: UploadService,
      private fb: FormBuilder
   ) {
      this.form = this.fb.group({
         name: ['image', Validators.required],
         avatar: null
      });
   }

   ngOnInit() {
      this.userId = Number.parseInt(localStorage.getItem('userId'));
      this.token = localStorage.getItem('auth_app_token');
      this.userService.getUser(this.userId, this.token).then(usuario => {
         this.user = JSON.parse(usuario['_body']);
      });
   }

   private prepareSave(): any {
      let input = new FormData();
      input.append('name', this.form.get('name').value);
      input.append('avatar', this.form.get('avatar').value);
      return input;
   }

   onSave() {
      this.userService.update(this.userId, this.token, this.user).then(resp => {
         console.log(resp);
        //  this.uploadService.makeFileRequest(this.form, this.userId, this.token).then(() => {

        //  })
      });
   }

   fileChangeEvent(event: any) {
      if (event.target.files.length > 0) {
         let file = event.target.files[0];
         this.form.get('avatar').setValue(file);
      }
   }

}