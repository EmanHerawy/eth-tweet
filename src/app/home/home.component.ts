import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
//  retrive all your  tweeets 
export class HomeComponent implements OnInit {
  status: string;
  constructor(private service: TwitterService) { }
  tweets = [];
  tweetNum;
  index = 0;
  membersNum;
  ngOnInit() {
    // this.getNumberOfAccounts();
    this.tweets = [];
  }
  setStatus(message: string) {
    this.status = message;
  }
  getMemeberNumber() {
    this.service.getNumberOfAccounts().then(t => {
      console.log(t, 'first call')
    })
  }
  getAccountOfAddress() {
    this.service.getUserAccountOfAddress().then((r) => {
      console.log('get contrat', r[0])
      if (r != '0x0000000000000000000000000000000000000000') {
        this.getTweetNumber(r)
      }
    })


  }
  getTweetNumber(address) {
    this.service.getTweetNumber(address).then(t => {
      this.tweetNum = t;
      for (let index = 0; index < this.tweetNum; index++) {
        this.gettweet(index);
      }
      console.log(t, 'first call')
    })
  }
  gettweet(id) {
    this.service.getTweet(id).then((t) => {
      console.log(t, 'first call');
      this.tweets.push(t);
    })
  }

}
