import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {

  changePwdForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.changePwdForm = this.fb.group({
      cpwd: ["", Validators.required],
      npwd: ["", Validators.required],
      mpwd: ["", [Validators.required, this.checkPasswordEquility()]]
    })
  }

  onSubmit(changePwdForm) {
    if (!changePwdForm.valid) {
      Object.keys(changePwdForm.controls).forEach(field => {
        const control = changePwdForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      console.log(changePwdForm);
    }
  }

  //custom validation for new password and confirm password equility
  private checkPasswordEquility() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.changePwdForm) {
        if (this.changePwdForm.value.npwd !== control.value) {
          return { 'passwordMismatch': { value: control.value } };
        }
      }
      return null;
    };
  }

}