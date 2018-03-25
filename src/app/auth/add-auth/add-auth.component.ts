import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TwitterService } from '../../twitter.service';

@Component({
  selector: 'app-add-auth',
  templateUrl: 'add-auth.component.html'
})

export class AddAuthComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: TwitterService) { }
  // , Validators.max(43), Validators.min(41)
  ngOnInit() { this.buildForm(); }
  buildForm() {
    this.form = this.fb.group({
      id: 0,
      name: [null, Validators.required],
      contractAddress: [null, Validators.required],

    });
  }
  save() {
    const data = this.form.value;
    console.log('saved', data);

    //  this.ledger.addAuthMember(data.name, data.contractAddress);
  }
}
