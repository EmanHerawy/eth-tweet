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
    viewMode = false;
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
        , private activatedRoute: ActivatedRoute
    ) { }
    onTweet() {
        if (this.userTweet != undefined && this.userTweet != null) {
            this.service.tweet(this.userTweet, this.contractaddress).then(t => {
                console.log(t, 'new tweet');

                const item = { tweet: this.userTweet, time: new Date().toLocaleTimeString() }
                this.tweets.push(item);

                this.userTweet = null;

            })
        }
    }
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.contractaddress = params['address'];
            if (this.contractaddress != undefined) {
                this.viewMode = true;
                console.log(this.contractaddress, 'address queryParams');
                this.getTweetNumber(this.contractaddress); // Print the parameter to the console. 
            } else {
                this.getAccountOfAddress();

            }
        });
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
    getTweetTime(timeStamp) {

        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        const date = new Date(timeStamp * 1000);
        // Hours part from the timestamp
        const hours = date.getHours();
        // Minutes part from the timestamp
        const minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        const seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
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
            console.log(t[0], 'tweet');
            console.log(t[1].c[0], 'tweet');
            const item = { tweet: t[0], time: this.getTweetTime(t[1].c[0]) }
            this.tweets.push(item);
        })
    }
}