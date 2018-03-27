import { Component, OnInit, Input } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: 'member.component.html'
})

export class MemberComponent implements OnInit {
  account: any;
  status: string;
  members = [];
  num;
  //MainAuth = contract(mainAuth);
  constructor(private service: TwitterService,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    // this.checkAndInstantiateWeb3();
    // this.onReady();
    this.activatedRoute.queryParams.subscribe(params => {
      this.num = params['memberCount'];
      if (this.num != undefined) {
        console.log(this.num); // Print the parameter to the console. 
        this.getMembers();
      }
    });
  }
  onDonate(address) {

  }
  onViewTweet(address) {

  }
  getMembers() {
    for (let index = 0; index < this.num; index++) {
      this.service.getAddressOfId(index).then((add) => {
        this.service.getAccountOfAddress(add).then((account) => {
          this.members.push(account);
        })
      })
    }
  }
}
