/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  template: `
    <ngx-auth-block>
      <h2 class="title">Sign Up</h2>
      <form (ngSubmit)="register()" #form="ngForm">

        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>

        <div class="form-group">
          <input type="text" name="firstName" [(ngModel)]="user.nombre" #firstName="ngModel"
                  class="form-control fullname" placeholder="First Name"
                  [class.form-control-danger]="firstName.invalid && firstName.touched"
                  [required]="getConfigValue('forms.validation.firstName.required')"
                  [minlength]="getConfigValue('forms.validation.firstName.minLength')"
                  [maxlength]="getConfigValue('forms.validation.firstName.maxLength')"
                  autofocus>
          <small class="form-text error" *ngIf="firstName.invalid && firstName.touched && firstName.errors?.required">
            Name is required!
          </small>
          <small
            class="form-text error"
            *ngIf="firstName.invalid && firstName.touched && (firstName.errors?.minlength || firstName.errors?.maxlength)">
            First name should contains
            from {{getConfigValue('forms.validation.password.minLength')}}
            to {{getConfigValue('forms.validation.password.maxLength')}}
            characters
          </small>

          <input type="text" name="lastName" [(ngModel)]="user.apellido" #lastName="ngModel"
                  class="form-control fullname" placeholder="Last Name"
                  [class.form-control-danger]="lastName.invalid && lastName.touched"
                  [required]="getConfigValue('forms.validation.lastName.required')"
                  [minlength]="getConfigValue('forms.validation.lastName.minLength')"
                  [maxlength]="getConfigValue('forms.validation.lastName.maxLength')"
                  autofocus>
          <small class="form-text error" *ngIf="lastName.invalid && lastName.touched && lastName.errors?.required">
            Name is required!
          </small>
          <small
            class="form-text error"
            *ngIf="lastName.invalid && lastName.touched && (lastName.errors?.minlength || lastName.errors?.maxlength)">
            Last name should contains
            from {{getConfigValue('forms.validation.password.minLength')}}
            to {{getConfigValue('forms.validation.password.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-name" class="sr-only">Full name</label>
          <input name="userName" [(ngModel)]="user.username" id="input-name" #userName="ngModel"
                 class="form-control" placeholder="UserName"
                 [class.form-control-danger]="userName.invalid && userName.touched"
                 [required]="getConfigValue('forms.validation.username.required')"
                 [minlength]="getConfigValue('forms.validation.username.minLength')"
                 [maxlength]="getConfigValue('forms.validation.username.maxLength')"
                 autofocus>
          <small class="form-text error" *ngIf="userName.invalid && userName.touched && userName.errors?.required">
            Full name is required!
          </small>
          <small
            class="form-text error"
            *ngIf="userName.invalid && userName.touched && (userName.errors?.minlength || userName.errors?.maxlength)">
            Full name should contains
            from {{getConfigValue('forms.validation.password.minLength')}}
            to {{getConfigValue('forms.validation.password.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Email address</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" #email="ngModel"
                 class="form-control" placeholder="Email address" pattern=".+@.+\..+"
                 [class.form-control-danger]="email.invalid && email.touched"
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
            Email is required!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.pattern">
            Email should be the real one!
          </small>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">Password</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control" placeholder="Password" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">
            Password is required!
          </small>
          <small
            class="form-text error"
            *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
            Password should contains
            from {{ getConfigValue('forms.validation.password.minLength') }}
            to {{ getConfigValue('forms.validation.password.maxLength') }}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-re-password" class="sr-only">Repeat password</label>
          <input
            name="rePass" [(ngModel)]="user.confirmPassword" type="password" id="input-re-password"
            class="form-control" placeholder="Confirm Password" #rePass="ngModel"
            [class.form-control-danger]="(rePass.invalid || password.value != rePass.value) && rePass.touched"
            [required]="getConfigValue('forms.validation.password.required')">
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass.errors?.required">
            Password confirmation is required!
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && password.value != rePass.value && !rePass.errors?.required">
            Password does not match the confirm password.
          </small>
        </div>

        <div class="form-group accept-group col-sm-12" *ngIf="getConfigValue('forms.register.terms')">
          <nb-checkbox name="terms" [(ngModel)]="user.terms" [required]="getConfigValue('forms.register.terms')">
            Agree to <a href="#" target="_blank"><strong>Terms & Conditions</strong></a>
          </nb-checkbox>
        </div>

        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Register
        </button>
      </form>

      <div class="links">

        <div class="socials">
          <a href="https://github.com/akveo" target="_blank" class="socicon-github"></a>
          <a href="https://www.facebook.com/akveo/" target="_blank" class="socicon-facebook"></a>
          <a href="https://twitter.com/akveo_inc" target="_blank" class="socicon-twitter"></a>
        </div>
        <small class="form-text">
          Already have an account? <a routerLink="../login"><strong>Sign in</strong></a>
        </small>
      </div>
    </ngx-auth-block>
  `,
})
export class NgxRegisterComponent extends NbRegisterComponent{

}
