import { Component, OnInit, Input } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-tweet',
    templateUrl: 'tweet.component.html'
})

export class TweetComponent implements OnInit {
    contractaddress: any;
    tweetNum: any;
    userTweet;
    tweets = [];
    account = {};
    @Input() set userAcount(data) {
        if (data != undefined) {
            this.account = data;
        }
    }
    @Input() set address(_addres) {
        if (_addres != undefined) {
            console.log(_addres, 'address');
            this.contractaddress = _addres;
            this.getTweetNumber(_addres);
        }
    }
    constructor(private service: TwitterService
        //, private activatedRoute: ActivatedRoute
    ) { }
    onTweet() {
        if (this.userTweet != undefined && this.userTweet != null) {
            this.service.tweet(this.userTweet, this.contractaddress).then(t => {
                console.log(t, 'new tweet');
                this.tweets.push(this.userTweet);
                this.userTweet = null;

            })
        }
    }
    ngOnInit() {
        this.getAccountOfAddress();
        // this.activatedRoute.queryParams.subscribe(params => {
        //     if (params['address'] != undefined) {
        //         console.log(params['address'], 'address');
        //         this.getTweetNumber(params['address']); // Print the parameter to the console. 
        //     }
        // });
    }
    getTweetNumber(address) {
        this.service.getTweetNumber(address).then(n => {
            console.log(n, 'tweet num');
            this.tweetNum = n;
            for (let index = 0; index < this.tweetNum; index++) {
                this.getTweet(index, address);
            }

        })
    }
    getAccountOfAddress() {
        this.service.getUserAccountOfAddress().then((r) => {
            if (r != undefined && r != null) {

                console.log('get contrat', r[0])
                if (r[0] != '0x0000000000000000000000000000000000000000') {
                    this.contractaddress = r[0];
                    this.getTweetNumber(this.contractaddress)
                }
            }
        })
    }
    getTweet(id, address) {
        this.service.getTweet(id, address).then(t => {
            console.log(t, 'tweet');
            this.tweets.push(t);
        })
    }
}