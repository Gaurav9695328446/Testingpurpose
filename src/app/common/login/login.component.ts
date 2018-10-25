import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/service/auth.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  loading: boolean = false;
  loginFail: boolean = false;
  isShowForgotPwd: boolean = false;
  constructor(
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])],
      password: ['', Validators.required],
    });
  }
  loginUser(loginForm) {
    if (!loginForm.valid) {
      Object.keys(loginForm.controls).forEach(field => {
        const control = loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
        //http://192.168.1.120:8080/netaji/client/
      })
    } else {
      this.loading = true;
      const url = API_URL + `oauth/token?client_id=finnov&client_secret=finnov&grant_type=password&password=${loginForm.value.password}&username=${loginForm.value.email}`;
      return this.http.get(url).subscribe(result => {
        window.localStorage.setItem('token', JSON.stringify({ result }));
        this.modalService.hide(1);
        this.loading = false;
        this.authService.setLoginStatus(true);
      }, error => {
        this.loading = false;
        this.loginFail = true;
      });
    }
  }

  showForgotPassword(isShow) {
    if (isShow) {
      this.initForgotPasswordForm();
    }
    this.isShowForgotPwd = isShow;
  }

  private initForgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])]
    });
  }

  forgotPassword(form) {
    if (!form.valid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      this.loading = true;

      return this.http.post(API_URL + "account/forgetPassword", { email: form.value.email }).subscribe(result => {
        this.loading = false;
        if (result["message"] == "Verification code has sent to your email id") {

          this.authService.setUserEmailId(form.value.email);
          this.toastrService.success(result['message'], "Success");
          this.router.navigate(['forgot-password']);

        } else {
          this.toastrService.error(result['message'], "Error");
          this.loading = false;
          this.loginFail = true;
        }

      }, error => {
        this.loading = false;
        this.loginFail = true;
      });
    }
  }

  ngOnDestroy() {
    this.initForgotPasswordForm();
  }
}
