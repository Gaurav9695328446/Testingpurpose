import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoginComponent } from '../login/login.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

const API_URL = environment.API_URL;


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  changePwdForm: FormGroup;
  loading: boolean = false;
  bsModalRef: BsModalRef;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private authservice : AuthService) { }


  ngOnInit() {

    this.changePwdForm = this.fb.group({
      code: ["", Validators.required],
      newPassword: ["", Validators.required],
      rePassword: ["", [Validators.required, this.checkPasswordEquility()]]
    })

  }

  //custom validation for new password and confirm password equility
  private checkPasswordEquility() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.changePwdForm) {
        if (this.changePwdForm.value.newPassword !== control.value) {
          return { 'passwordMismatch': { value: control.value } };
        }
      }
      return null;
    };
  }

  changeForgotPass(changePwdForm) {
    if (!changePwdForm.valid) {
      Object.keys(changePwdForm.controls).forEach(field => {
        const control = changePwdForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      this.loading = true;
      changePwdForm.patchValue({
        email: this.authservice.getUserEmailId()
      })
      return this.http.post(API_URL + "account/changePassword", changePwdForm.value).subscribe(result => {
        this.loading = false;
        if (result["message"] == "Password updated Sucessfully") {
          this.toastrService.success(result['message'], "Success");
          this.router.navigate(['home']);
          this.bsModalRef = this.modalService.show(LoginComponent);
        } else {
          this.toastrService.error(result['message'], "Error");
        }
      }, error => {
        this.loading = false;

      });
    }
  }

}
