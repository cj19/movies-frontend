import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  username: string;

  authenticated: boolean;

  private usernameSubscription: Subscription;

  private authenticationSubscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.usernameSubscription = this.authService.authUserChanged
      .subscribe((newUsername: string) => this.username = newUsername);
    this.authenticationSubscription = this.authService.authTokenChanged
      .subscribe((newStatus: string) => {
    if (newStatus != null) {
      this.authenticated = true;
    }});
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe();
    this.authenticationSubscription.unsubscribe();
  }
}
