import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/service/auth.service';

import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  signing: boolean = false;
  signinFail: boolean = false;
  isConfirmEmail: boolean = false;
  constructor(public bsModalRef: BsModalRef,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.RegisterForm = this.formBuilder.group({
      sal: ['Mr.', Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])],
      mobile: [null, Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      password: [null, Validators.required],
      code: [null, Validators.required]
    });
  }
  registerUser(RegisterForm) {
    if (!RegisterForm.valid) {
      Object.keys(RegisterForm.controls).forEach(field => {
        const control = RegisterForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {

      this.signing = true;
      let options = {};
      this.http.post(API_URL + 'account/create', RegisterForm.value, options)
        .subscribe((res) => {
          console.log(res);
          if (res['status'] === true) {
            this.loginAPi();
            this.signing = false;
            this.modalService.hide(1);
          } else {
            this.toastrService.error(res['message'], "Error");
            this.signing = false;
            this.signinFail = true;
          }

        }, err => {
          this.signing = false;
          this.signinFail = true;
        });

    }
  }

  //confirm Email
  confirmEmail(email) {

    this.signing = true;
    let options = {};
    this.http.post(API_URL + 'account/verfiyEmail', { email: email })
      .subscribe((res) => {
        console.log(res);
        if (res['message'] == "Verification code has sent to your email id") {
          this.isConfirmEmail = true;
          this.signing = false;
          this.toastrService.success(res['message'], "Success");
        } else {
          this.toastrService.error(res['message'], "Error");
          this.signing = false;
          this.isConfirmEmail = false;
        }

      }, err => {
        this.signing = false;
        this.signinFail = true;
      });
  }


  loginAPi() {
    console.log(this.RegisterForm);
    const url = API_URL + `oauth/token/?client_id=finnov&client_secret=finnov&grant_type=password&password=${this.RegisterForm.value.password}&username=${this.RegisterForm.value.email}`;
    return this.http.get(url).subscribe(result => {
      window.localStorage.setItem('token', JSON.stringify({ result }));

      this.authService.setLoginStatus(true);
    }, error => {

    });
  }
}
