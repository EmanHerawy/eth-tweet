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
  account = {};
  contractAddress;
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
      if (r != undefined && r != null) {
        console.log('get contrat', r[0])
        if (r[0] != '0x0000000000000000000000000000000000000000') {
          this.contractAddress = r[0];
        }
      }
    })


  }


}
