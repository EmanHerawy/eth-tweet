import { Component, OnInit } from '@angular/core';
import { canBeNumber } from '../util/validation';
import { TwitterService } from './twitter.service';

const Web3 = require('web3');
const contract = require('truffle-contract');
// const metaincoinArtifacts = require('../../build/contracts/MetaCoin.json');
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  },
}

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Login: boolean;
  status: string;
  constructor(private service: TwitterService) { }
  tweets = [];
  membersNum;
  userBalance;
  tweetCount;
  account;
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
      console.log('get contrat', r[0])
      if (r[0] != '0x0000000000000000000000000000000000000000') {
        this.service.getِTweetContractBalance(r[0]).then(e => this.userBalance = e);
        this.service.getTweetNumber(r[0]).then(e => this.tweetCount = e);
      }
    })


  }
  onLogin(address) {
    this.account = address;
    this.Login = true
  }

  loginClick() {
  }
}
