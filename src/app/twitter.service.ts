import { Injectable } from '@angular/core';
const contract = require('truffle-contract');
const tweetRegistry = require('../../build/contracts/TweetRegistry.json');
const tweetAccount = require('../../build/contracts/TweetAccount.json');
declare global {
  interface Window { web3: any; }
}

window.web3 = window.web3 || {};
@Injectable()
export class TwitterService {

  account: any;
  accounts: any;
  web3: any;
  status: string;

  TweetRegistry = contract(tweetRegistry);
  TweetAccount = contract(tweetAccount);

  constructor() {
    this.web3 = window.web3;

    ///this.checkAndInstantiateWeb3();
    this.onReady();
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
  // manage account

  /****************** for tweeets contract********************** */
  // const result =await return int numberOfTweets
  async  getTweetNumber(address) {
    const tweetContract = this.TweetAccount.at(address);
    const result = await tweetContract
      .then((instance) => {
        // meta = instance;
        return instance.getNumberOfTweets.call();
      }).then((rs) => {
        console.log('rs', rs.c[0]);
        this.setStatus('Transaction complete!');
        return rs.c[0];

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
      return instance.Donate.sendTransaction({
        from: this.account, gas: 300000, value: value
      });
    }).then((rs) => {
      console.log('rs donateToAccount', rs);
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
  async TweepDeActivateAccount(address) {
    const result = await this.TweetAccount.at(address)
      .then((instance) => {
        return instance.adminDeleteAccount.sendTransaction({
          from: this.account, gas: 300000
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
  async tweebRetrieveDonations(to, amount, address) {
    const result = await this.TweetAccount.at(address)
      .then((instance) => {
        return instance.adminRetrieveDonations.sendTransaction(to, amount, {
          from: this.account, gas: 300000
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
  async getOwnerAddress(address) {
    const result = await this.TweetAccount.at(address)
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
  async tweet(tweetString, address) {
    console.log(address, 'address');

    const result = await this.TweetAccount.at(address)
      .then((instance) => {
        return instance.tweet.sendTransaction(tweetString, {
          from: this.account, gas: 300000
        });
      }).then((rs) => {
        console.log('rs tweet', rs);
        this.setStatus('Transaction complete!');
        return rs;

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }
  async  getTweet(tweetId, address) {
    const result = await this.TweetAccount.at(address)
      .then((instance) => {
        // meta = instance;
        return instance.getTweet.call(tweetId);
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
  async  getLatestTweet(address) {
    const result = await this.TweetAccount.at(address)
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
        return instance.Donate.sendTransaction({
          from: this.account, gas: 300000, value: value
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
  async  register(name/*, address*/) {

    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.register.sendTransaction(name, {
          // from: this.account, gas: 300000
          from: this.account, gas: 3000000
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
        return instance.getAddressOfName.call(name);
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
  async  isCurrentUserAdmin() {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        console.log('this.account', this.account)
        return instance.getAddressOfId.call(0)
      }).then((rs) => {
        console.log('getUserAccountOfAddress', rs);

        this.setStatus('Transaction complete!');
        return (this.account == rs);

      })
      .catch((e) => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }); return result;
  }

  async  getAccountOfAddress(addr) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.getAccountOfAddress.call(addr);

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
  async  getAccountById(index) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.getAccountById.call(index);
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
        return instance.getNameOfAddress.call(addr);
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
        return instance.getAddressOfId.call(id);
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
        return instance.unregister.sendTransaction({
          from: this.account, gas: 300000
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
  async adminUnregister(name) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminUnregister.sendTransaction(name, {
          from: this.account, gas: 300000
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
  async  adminSetRegistrationDisabled(status: boolean) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminSetRegistrationDisabled.sendTransaction(status, {
          from: this.account, gas: 300000
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
  async  adminSetAccountAdministrator(accountAdmin) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminSetAccountAdministrator.sendTransaction(accountAdmin, {
          from: this.account, gas: 300000
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
  async  adminRetrieveDonations(to, amount) {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminRetrieveDonations.sendTransaction(to, amount, {
          from: this.account, gas: 300000
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
  async  adminDeleteRegistry() {
    const result = await this.TweetRegistry.deployed()
      .then((instance) => {
        return instance.adminDeleteRegistry.sendTransaction({
          from: this.account, gas: 300000
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
  async  getRegistryBalance() {
    const result = await this.TweetRegistry.deployed()
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
        console.log('rs.c[0]', rs.c[0]);
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
