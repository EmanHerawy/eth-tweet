import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TwitterService } from './twitter.service';
import { AppRouts } from './app.routing';
import {
  HomeComponent, RegisterComponent, MemberComponent,
  AccountSettingComponent, TweetComponent
} from './index';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, TweetComponent,
    MemberComponent, RegisterComponent
    //, AddDNAComponent, UserAddComponent, UserEditComponent, 
    // UserSearchComponent
    ,
    AccountSettingComponent
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


