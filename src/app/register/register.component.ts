import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../shared/user.model';
import {HttpHeaders} from '@angular/common/http';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f')
  registerForm: NgForm;

  private registerUser: User;

  constructor( private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.registerUser = new User(this.registerForm.value.userData.firstName,
      this.registerForm.value.userData.lastName,
      this.registerForm.value.userData.username,
      this.registerForm.value.userData.email,
      this.registerForm.value.userData.password);
      this.authService.signUpUser(this.registerUser);
  }
}
