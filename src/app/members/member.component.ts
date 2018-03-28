import { Component, OnInit, Input } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: 'member.component.html'
})

export class MemberComponent implements OnInit {
  account: any;
  status: string;
  members = [];
  num;
  donateValue;
  //MainAuth = contract(mainAuth);
  constructor(private service: TwitterService,
    private router: Router) {
  }

  ngOnInit() {
    this.getMembersCount()
  }
  getMembersCount() {
    this.service.getNumberOfAccounts().then((rs) => {
      console.log(rs, 'getNumberOfAccounts member component')
      for (let index = 0; index < rs; index++) {
        this.getMemeberData(index);
      }
    })
  }
  getMemeberData(index) {
    this.service.getAccountById(index).then(m => {
      console.log(m, 'member data');
      const member = { address: m[0], name: m[1] }
      this.members.push(member);
    })
  }
  onDonate(address) {
    this.service.donateToAccount(address, this.donateValue).then(s => {
      console.log(s, 'donate');

    })
  }
  onViewTweet(address) {
    this.router.navigate(['/viewTweet'], { queryParams: { address: address } });

  }

}
