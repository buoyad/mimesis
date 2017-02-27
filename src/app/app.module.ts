// ANGULAR IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// LIBRARY IMPORTS
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { NgSemanticModule } from "ng-semantic/ng-semantic";

// APP IMPORTS
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthComponent } from './auth/auth.component';
import { PoolComponent } from './pools/pool/pool.component';
import { PoolCreatorComponent } from './pools/pool-creator/pool-creator.component';
import { PoolService } from './pools/pool.service';
import { AutocompleteDirective } from './shared/autocomplete.directive';
import { ProfileComponent } from './auth/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './pools/thread/thread.component';
import { SummaryComponent } from './pools/summary/summary.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ProfileGuard } from './auth/profile/profile-guard.service';


// ==== ROUTER CONFIG ==== //
const appRoutes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PoolCreatorComponent },
  { 
    path: 'pool/:id', 
    component: PoolComponent,
    children: [
      { path: '', component: SummaryComponent },
      { path: ':stoneIndex', component: ThreadComponent }
    ]
  },
  { path: '', component: HomeComponent},
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: ':username', component: ProfileComponent, canActivate: [ProfileGuard] },
  { path: '**', component: PageNotFoundComponent }
];
// ======================= //

// ==== FIREBASE CONFIG ==== //
export const firebaseConfig = {
  apiKey: 'AIzaSyAtMuKiFqejHxPOEORGinx0eFJfeDjQ9hw',
  authDomain: "project-2747913655904263435.firebaseapp.com",
  databaseURL: "https://project-2747913655904263435.firebaseio.com",
  storageBucket: "project-2747913655904263435.appspot.com",
  messagingSenderId: '136814027844'
};
export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
// ========================= //

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AuthComponent,
    PoolComponent,
    PoolCreatorComponent,
    AutocompleteDirective,
    ProfileComponent,
    HomeComponent,
    ThreadComponent,
    SummaryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgSemanticModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [
    AuthService,
    PoolService,

    AuthGuard,
    ProfileGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

