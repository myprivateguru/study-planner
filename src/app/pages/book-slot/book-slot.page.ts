import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ConferenceData } from '../../providers/conference-data';

import { UserOptions } from '../../interfaces/user-options';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.page.html',
  styleUrls: ['./book-slot.page.scss'],
})
export class BookSlotPage implements OnInit {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  sessions: any;
  data: any;

  constructor(
    public router: Router,
    public confData : ConferenceData
  ) { 
    
     fetch('./assets/data/slots.json').then(res=>
      res.json())
      .then(json=>{
        this.data=json.sessions;
        console.log("log session data")
        console.log(this.data);
    
      })

  }

  ngOnInit() {
   
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      console.log("pincode="+this.login.username+"&"+"date="+this.login.password);
      
    }
  }

}
