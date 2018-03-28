import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TwitterService } from '../twitter.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    form: FormGroup;
    constructor(private fb: FormBuilder, private router: Router, private service: TwitterService) { }
    // , Validators.max(43), Validators.min(41)
    ngOnInit() { this.buildForm(); }
    buildForm() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            //  address: [null, Validators.required],

        });
    }
    onRegister() {
        const data = this.form.value;
        console.log('saved', data);
        const x = true
        this.service.
            register(this.form.get('name').value
                //     ,                this.form.get('address').value
            ).then(r => {
                console.log(r, 'regerster');

            })

        //  this.ledger.addAuthMember(data.name, data.contractAddress);
    }
    // onLogin() {
    //     const data = this.form.value;
    //     console.log('saved', data);
    //     this.service.getAccountOfAddress(this.form.get('address').value)
    //         .then(r => {
    //             console.log(r, 'login');
    //             if (r != undefined && r != null) {
    //                 console.log('get contrat', r[0])
    //                 if (r[0] != '0x0000000000000000000000000000000000000000') {
    //                     this.router.navigate(['/home'])
    //                 }
    //             }
    //         })
    //     //  this.ledger.addAuthMember(data.name, data.contractAddress);
    // }
}