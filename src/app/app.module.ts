// ANGULAR IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// LIBRARY IMPORTS
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// APP IMPORTS
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthComponent } from './auth/auth.component';


// ==== ROUTER CONFIG ==== //
const appRoutes: Routes = [
  { path: 'login', component: AuthComponent }
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
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

