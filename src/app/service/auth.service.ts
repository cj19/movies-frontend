import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/user.model';
import {AlertService} from 'ngx-alerts';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../shared/login.model';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {

  authToken: string;

  authUser: string;

  authTokenChanged = new Subject<string>();

  authUserChanged = new Subject<string>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'response'
    })
  };

  constructor(private router: Router, private route: ActivatedRoute,
              private alertService: AlertService, private httpClient: HttpClient) {
  }

  signUpUser(registerUser: User) {
    console.log(registerUser);
    this.httpClient.post<User>('http://localhost:8080/user', registerUser, this.httpOptions).subscribe(
      result => {
        setTimeout(() => {
          this.alertService.success(result.username + ' registered!');
        }, 1000);
        this.router.navigate(['login'], {relativeTo: this.route});
      },
      error => {console.log(error);
    this.alertService.danger(error.error.message);
      });
  }

  signInUser(loginRequest: Login) {
    this.httpClient.post<any>('http://localhost:8080/user/signin', loginRequest,
      this.httpOptions).subscribe(response => {
        this.authToken = response.tokenType + ' ' + response.accessToken;
        this.authUserChanged.next(loginRequest.username);
        this.authTokenChanged.next(this.authToken);
        setTimeout(() => {
          this.alertService.success(loginRequest.username + ' logged in!');
        }, 2000);
        this.router.navigate(['movies'], {relativeTo: this.route});
      },
      error => console.log(error));
  }

  isAuthenticated() {
    return this.authToken != null;
  }
}
