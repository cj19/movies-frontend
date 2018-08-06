import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {MoviesComponent} from './movies/movies.component';
import {AuthGuardService} from './service/auth-guard.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movies', component: MoviesComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}) //Lazy Loading
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuardService]
})
export class AppRoutingModule {
}
