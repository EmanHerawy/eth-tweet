import { Component, OnInit } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
//const mainAuth = require('../../../build/contracts/MainAuth.json');
const contractAddress = '0xa449f9d01d3ce39ed40034db207c98949a572b92';
const abi = "";
@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})

export class AuthComponent implements OnInit {
  account: any;
  accounts: any;
  web3: any;
  status: string;
  members = [];
  //MainAuth = contract(mainAuth);
  constructor() {
  }
  ngOnInit() {
    // this.checkAndInstantiateWeb3();
    // this.onReady();
    // this.getMembers();
  }/*
  changeStaus(status, address, index) {
    if (status) {
      this.freezeMember(address);
    } else {
      this.unFreezeMember(address);

    }
    this.members[index]['isActive'] = !status;
  }
  checkAndInstantiateWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof this.web3 !== 'undefined') {
      console.warn('Using web3 detected from external source. If you find that your accounts don\'t appear or you have ' +
        '0 MainAuth, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel ' +
        'free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask');
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      console.warn('No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when ' +
        'you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info ' +
        'here: http://truffleframework.com/tutorials/truffle-and-metamask');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  }

  onReady() {
    // Bootstrap the MainAuth abstraction for Use.
    this.MainAuth.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];
      console.log(this.account);
      //  this.refreshBalance();
    });
  }
  setStatus(message: string) {
    this.status = message;
  }
  addAuthMember(name: string, newAccount: string) {
    let meta;
    this.MainAuth.deployed()
      .then((instance) => {
        meta = instance;
        return meta.addauth(newAccount, name, {
          from: this.account
        });
      })
      .then(() => {
        this.setStatus('Transaction complete!');
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  }
  getIssuer(): any {
    console.log('getIssuer')
    let meta;
    let data;
    this.MainAuth.deployed()
      .then((instance) => {
        // meta = instance;
        instance.Issuer().then((s) => {
          data = s;
          console.log('instance', s);
          return data;
        });

      })
      .then(() => {
        this.setStatus('Transaction complete!');
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  }
  getMembers() {
    // const Mycontract = this.web3.eth.contract(abi).at(contractAddress);
    // console.log(Mycontract.call().getAuthoritiesCount()
    // )
    let meta;
    let data;
    this.MainAuth.deployed()
      .then((accept, reject) => {
        meta = accept;
        return data = meta.getAuthoritiesCount.call();
        // data.then((s) => {
        //   this.members = s;
        //   console.log('instance', s);
        // });

      })
      .then((rs) => {
        console.log('rs', rs);
        console.log('rs.s', rs.c[0]);
        for (let x = 0; x < rs.c[0]; x++) {
          this.getMemberList(x);
        }
        this.setStatus('Transaction complete!');
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  }
  freezeMember(newAccount: string) {
    let meta;
    this.MainAuth.deployed()
      .then((instance) => {
        console.log('frozeauth')

        meta = instance;
        return meta.frozeauth(newAccount, {
          from: this.account, gas: 33859
        });
      })
      .then((res) => {
        console.log('frozeauth', res)

        this.setStatus('Transaction complete!');
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error Transaction; see log.');
      });
  }
  unFreezeMember(newAccount: string) {
    let meta;
    this.MainAuth.deployed()
      .then((instance) => {
        console.log('frozeauth')

        meta = instance;
        return meta.unfrozeauth(newAccount, {
          from: this.account, gas: 33884
        });
      })
      .then((res) => {
        console.log('frozeauth', res)

        this.setStatus('Transaction complete!');
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error Transaction; see log.');
      });
  }
  getMemberList(index) {
    // const Mycontract = this.web3.eth.contract(abi).at(contractAddress);
    // console.log(Mycontract.call().getAuthoritiesCount()
    // )
    let meta;
    let data;
    this.MainAuth.deployed()
      .then((accept, reject) => {
        meta = accept;
        return data = meta.getMemberData.call(index);
        // data.then((s) => {
        //   this.members = s;
        //   console.log('instance', s);
        // });

      })
      .then((rs) => {
        console.log('rs', rs);
        let data = { name: rs[0], isActive: rs[1], address: rs[2] }
        this.members.push(data);
        console.log('rs', data);

        this.setStatus('Transaction complete!');
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  }
  // App.contracts.Adoption.deployed().then(function(instance) {
  //   adoptionInstance = instance;

  //   return adoptionInstance.getAdopters.call();
  // }).then(function(adopters) {
  //   debugger;
  //   for (i = 0; i < adopters.length; i++) {
  //     if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //       $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //     }
  //   }
  // }).catch(function(err) {
  //   console.log(err.message);
  // });
*/
}
