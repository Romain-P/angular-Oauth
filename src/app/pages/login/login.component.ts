import {ChangeDetectorRef, Component, ApplicationRef, Injectable, Input, TemplateRef} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean;
  private authError:string;

  constructor(fb:FormBuilder, private loginService:AuthenticationService, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    this.loginService.authenticate(values['email'], values['password']).subscribe(
      () => {},
      () => this.authError = "Invalid username or password"
    );
  }

  public onLogout(): void {
    this.router.navigateByUrl("/pages/login")
  }
}

@Component({
  selector: 'child',
  template: `
    <div>
      here is child template that includes myTemplate
      <ng-container [ngTemplateOutlet]="myTemplate"></ng-container>
    </div>`
})
export class ChildComponent {
  @Input() myTemplate: TemplateRef<any>;
}
