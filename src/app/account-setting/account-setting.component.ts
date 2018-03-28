import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-setting',
  templateUrl: 'account-setting.component.html'
})

export class AccountSettingComponent implements OnInit {


  showAdminSetting: boolean;
  userName: string;
  contractAddress: string;
  appBalance: number;
  userBalance: number;
  userAddress: string;
  appTo; appAmount: number;
  tweepTo; tweepAmount: number;
  constructor(private service: TwitterService, private router: Router) {
  }
  ngOnInit() {
    this.idAdmin()
    this.getAccountOfAddress()
  }
  getAccountOfAddress() {
    this.service.getUserAccountOfAddress().then((r) => {
      if (r != undefined && r != null) {
        console.log('get contrat', r[0])
        if (r[0] != '0x0000000000000000000000000000000000000000') {
          this.userName = r[1];
          this.contractAddress = r[0];
          this.service.getِTweetContractBalance(r[0]).then(e => this.userBalance = e);
          //this.service.getTweetNumber(r[0]).then(e => this.tweetCount = e);
        } else {
          this.router.navigate(['/register'])
        }
      }
    })


  }
  idAdmin() {
    this.service.isCurrentUserAdmin().then(t => {
      console.log(t, 'isAdmin');
      this.showAdminSetting = t;
      if (t == true) {
        this.service.getRegistryBalance().then(b => {
          console.log(b, 'app balance');
          this.appBalance = b;
        })
      }
    })
  }
  onAccountDeactivate() {
    this.service.TweepDeActivateAccount(this.contractAddress).then(s => {
      console.log(s, 'deactivate');

    })
  }
  onTransferFromTweetAcount() {
    console.log(this.tweepAmount, 'tweepAmount ');
    console.log(this.tweepTo, 'to  ');

    this.service.tweebRetrieveDonations(this.tweepTo, this.tweepAmount, this.contractAddress).then(d => {
      console.log(d, 'transfer from tweep');

    })
  }
  onTransferFromAppAcount() {
    console.log(this.appAmount, 'app amount ');
    console.log(this.appTo, 'to app ');
    this.service.adminRetrieveDonations(this.appTo, this.appAmount).then(d => {
      console.log(d, 'transfer from app');

    })
  }
}
