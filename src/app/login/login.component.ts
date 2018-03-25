import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TwitterService } from '../twitter.service';
import { EventEmitter } from 'events';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    @Output() onLog = new EventEmitter();
    voted = false;
    form: FormGroup;
    constructor(private fb: FormBuilder, private service: TwitterService) { }
    // , Validators.max(43), Validators.min(41)
    ngOnInit() { this.buildForm(); }
    buildForm() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            address: [null, Validators.required],

        });
    }
    onRegister() {
        const data = this.form.value;
        console.log('saved', data);
        const x = true
        this.service.register(data.name)
        this.onLog.emit(data.address);

        //  this.ledger.addAuthMember(data.name, data.contractAddress);
    }
    onLogin() {
        const data = this.form.value;
        console.log('saved', data);
        this.onLog.emit(data.address);
        //  this.ledger.addAuthMember(data.name, data.contractAddress);
    }
}