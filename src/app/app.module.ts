import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TwitterService } from './twitter.service';
import { AppRouts } from './app.routing';
import {
  HomeComponent, LoginComponent, MemberComponent,
  AddAuthComponent, AuthComponent
} from './index';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, MemberComponent, AddAuthComponent, LoginComponent
    //, AddDNAComponent, UserAddComponent, UserEditComponent, 
    // UserSearchComponent
    ,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouts),
    FormsModule, ReactiveFormsModule,
    HttpModule
  ],
  providers: [TwitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }


