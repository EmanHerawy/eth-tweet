import { Injectable } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const tweetRegistry = require('../../build/contracts/TweetRegistry.json');
const tweetAccount = require('../../build/contracts/TweetAccount.json');

@Injectable()
export class TwitterService {

  account: any;
  accounts: any;
  web3: any;
  status: string;

  TweetRegistry = contract(tweetRegistry);
  TweetAccount = contract(tweetAccount);

  constructor() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }
  checkAndInstantiateWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof this.web3 !== 'undefined') {
      console.warn('Using web3 detected from external source. If you find that your accounts don\'t appear or you have ' +
        '0 TweetRegistry, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel ' +
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
  getMembers() {
    console.log('authorities')
    let meta;
    this.TweetRegistry.deployed()
      .then((instance, error) => {
        // meta = instance;
        //   console.log(instance);
      });
  }
  onReady() {
    // Bootstrap the TweetRegistry abstraction for Use.
    this.TweetRegistry.setProvider(this.web3.currentProvider);
    this.TweetAccount.setProvider(this.web3.currentProvider);

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
    this.TweetRegistry.deployed()
      .then((instance) => {
        console.log('addAuthMember')

        meta = instance;
        return meta.addauth(newAccount, name, {
          from: this.account, gas: 101491
        });
      })
      .then((res) => {
        console.log('addAuthMember', res)

        this.setStatus('Transaction complete!');
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  }
  createIdentity(data) {

    let meta;
    this.TweetRegistry.deployed()
      .then((instance) => {
        console.log('createIdentity', parseInt(data.nationalId, 10));

        meta = instance;
        return meta.createidentity(parseInt(data.nationalId, 10), data.firstName,
          data.bloodGroup,
          data.fathercontractAddress,
          data.mothercontractAddress, {
            from: this.account, gas: 3000000
          });
      })
      .then((res) => {
        console.log('createIdentity', res)

        this.setStatus('Transaction complete!');
      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  }

  async getIssuer() {
    console.log('getIssuer')
    let meta;
    let data;
    this.TweetRegistry.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.Issuer.call();
      })
      .then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  }

  async getCurrentAccount() {
    return this.account
    // const currentAccount = await this.web3.eth.getAccounts((err, accs) => {
    //   if (err != null) {
    //     alert('There was an error fetching your accounts.');
    //     return;
    //   }

    //   if (accs.length === 0) {
    //     alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
    //     return;
    //   }
    //   this.accounts = accs;
    //   this.account = this.accounts[0];
    //   console.log(this.account);
    //   return this.account;
    //   //  this.refreshBalance();
    // });
    // return currentAccount;
  }
  /****************** for tweeets contract********************** */
  // const result =await return int numberOfTweets
  async  getTweetNumber(address) {
    const tweetContract = this.TweetAccount.at(address);
    const result = await tweetContract
      .then((instance) => {
        // meta = instance;
        return instance.getNumberOfTweets.call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        console.log('error');
        this.setStatus('Error sending coin; see log.');
      }); return result;

  }


  async donateToAccount(address, value) {
    const tweetContract = this.TweetAccount.at(address);
    const result = await tweetContract.then((instance) => {
      return instance.Donate({
        from: this.account, gas: 300000, value: value
      }).call();
    }).then((rs) => {
      console.log('rs', rs);
      this.setStatus('Transaction complete!');
      return rs;

    })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async getِTweetContractBalance(address) {
    console.log(address, 'from balnace')

    const tweetContract = this.TweetAccount.at(address);
    const result = await tweetContract
      .then((instance) => {
        // meta = instance;
        console.log(instance, 'from balnace')

        return instance.getBalance.call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async adminDeleteAccount() {
    const result = await this.TweetAccount.deployed()
      .then((instance) => {
        return instance.adminDeleteAccount({
          from: this.account, gas: 300000
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async tweebRetrieveDonations(to, amount) {
    const result = await this.TweetAccount.deployed()
      .then((instance) => {
        return instance.adminRetrieveDonations(to, amount, {
          from: this.account, gas: 300000
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async getOwnerAddress() {
    const result = await this.TweetAccount.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getOwnerAddress.call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async tweet(tweetString) {
    const result = await this.TweetAccount.deployed()
      .then((instance) => {
        return instance.tweet(tweetString, {
          from: this.account, gas: 300000
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  getTweet(tweetId) {
    const result = await this.TweetAccount.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getTweet(tweetId).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  getLatestTweet() {
    const result = await this.TweetAccount.deployed()
      .then((instance) => {
        // meta = instance;
        return instance.getLatestTweet.call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async createTwitterAcccount() {
    const result = await this.TweetAccount.new()
      .then((instance) => {
        // meta = instance;
        console.log(instance.address);

        return instance.address;
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  /****************** for registry contract********************** */
  async donateToApp(value) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.Donate({
          from: this.account, gas: 300000, value: value
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  register(name) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.register.call(name, {
          // from: this.account, gas: 300000
          from: '0xd24a014b8fd79f2a5082cf4fb961c918cb92f497', gas: 300000
        });
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  getAddressOfName(name) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.getAddressOfName(name).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  getUserAccountOfAddress() {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        console.log('this.account', this.account)
        return instance.getAccountOfAddress.call(this.account);
      }).then((rs) => {
        console.log('getUserAccountOfAddress', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  getAccountOfAddress(addr) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.getAccountOfAddress(addr).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  getNameOfAddress(addr) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.getNameOfAddress(addr).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  getAddressOfId(id) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.getAddressOfId(id).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  unregister() {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.unregister({
          from: this.account, gas: 300000
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async adminUnregister(name) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminUnregister(name, {
          from: this.account, gas: 300000
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  adminSetRegistrationDisabled(status: boolean) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminSetRegistrationDisabled(status, {
          from: this.account, gas: 300000
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  adminSetAccountAdministrator(accountAdmin) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminSetAccountAdministrator(accountAdmin, {
          from: this.account, gas: 300000
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  adminRetrieveDonations(to, amount) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminRetrieveDonations(to, amount, {
          from: this.account, gas: 300000
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;

  }
  async  adminDeleteRegistry() {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminDeleteRegistry({
          from: this.account, gas: 300000
        }).call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;

  }
  async  getRegistryBalance(address) {
    const result = await this.TweetRegistry.at(address)
      .then((instance) => {
        return instance.getBalance.call();
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;

  }
  async  getNumberOfAccounts() {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.getNumberOfAccounts.call();
      }).then((s) => {
        console.log(s, 'from service')
        return s;
      }).then((rs) => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs.c[0];

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

}
