import { Component, OnInit } from '@angular/core';
import { canBeNumber } from '../util/validation';
import { TwitterService } from './twitter.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  status: string;
  constructor(private service: TwitterService, private router: Router) { }
  tweets = [];
  membersNum;
  userBalance;
  tweetCount;
  account;
  donateValue
  ngOnInit() {

    this.getNumberOfAccounts();
    this.getAccountOfAddress();
  }

  setStatus(message: string) {
    this.status = message;
  }
  getNumberOfAccounts() {
    this.service.getNumberOfAccounts().then((rs) => {
      console.log(rs, 'getNumberOfAccounts')
      this.membersNum = rs;
    })


  }
  getAccountOfAddress() {
    this.service.getUserAccountOfAddress().then((r) => {
      if (r != undefined && r != null) {
        console.log('get contrat', r[0])
        if (r[0] != '0x0000000000000000000000000000000000000000') {
          this.service.getِTweetContractBalance(r[0]).then(e => this.userBalance = e);
          this.service.getTweetNumber(r[0]).then(e => this.tweetCount = e);
        } else {
          this.router.navigate(['/register'])
        }
      }
    })


  }
  onDonate() {
    this.service.donateToApp(this.donateValue).then(s => {
      console.log(s, 'donate');
      alert('Thanks for supporting us')
    })
  }
}
