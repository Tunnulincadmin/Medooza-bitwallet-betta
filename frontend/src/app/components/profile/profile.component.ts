import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services';
import { FormGroup, Validators, FormControl } from '@angular/forms';
declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pageTitle: String = 'Profile';

  pUser: any;
  myform: FormGroup;
  constructor(private title: Title, private auth: AuthService) {
    this.title.setTitle('Profile');
  }
  get first_name() { return this.myform.get('first_name'); }
  get last_name() { return this.myform.get('last_name'); }
  get email() { return this.myform.get('email'); }
  get password() { return this.myform.get('password'); }
  get cpassword() { return this.myform.get('cpassword'); }
  get phone() { return this.myform.get('phone'); }
  createForm() {
    this.myform = new FormGroup({
      'first_name': new FormControl('', [
        Validators.required
      ]),
      'last_name': new FormControl('', [
        Validators.required
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.minLength(6)
      ]),
      'cpassword': new FormControl('', [
        Validators.minLength(6)
      ]),
      'phone': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    });
  }
  ngOnInit() {
    this.pUser = this.auth.getUser();
    this.createForm();
  }
  updateUser() {
    if (this.password.value !== '' && this.password.value !== this.cpassword.value) {
      return Materialize.toast('Password should match with confirm password.', 4000);
    } else if (!this.myform.valid) {
      return Materialize.toast('Invalid Form.', 4000);
    } else {
      this.auth.updateProfile(this.myform.value).subscribe((res) => {
        if (res.status === 'success') {
          // this.pUser = res.body;
          this.auth.updateLocalUser(res.body);
          this.pUser = this.auth.getUser();
        }
        Materialize.toast(res.message, 4000);
      });
    }
  }

}
