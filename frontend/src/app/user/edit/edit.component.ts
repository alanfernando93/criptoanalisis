import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../@core/data/users.service';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  user: any = {};
  url: string;
  myFile: File;
  swname: boolean = true;
  swapp: boolean = true;
  swfc: boolean = true;
  swemail: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (localStorage.length !== 0) {
      this.userService.getCurrentUser().subscribe(resp => {
        this.user = resp;
        this.url = this.user.perfil;

      });
    }
  }
  onSave() {
    delete this.user.perfil;
    const body = new FormData();
    body.append('Key', this.user.username);
    body.append('Value', this.myFile);
    this.userService.update(this.user).subscribe(user => {
      if (this.myFile !== undefined && this.myFile !== this.user.perfil) {
        this.userService.imageFileUpload(body).subscribe((image) => {
          this.router.navigate(['/' + this.userService.getUserId()]);
        });
      } else {
        this.router.navigate(['/' + this.userService.getUserId()]);
      }
    });
  }

  fileChangeEvent(files: any) {
    this.myFile = files[0];
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
}
