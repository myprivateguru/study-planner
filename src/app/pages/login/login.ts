import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SmsRetriever } from '@ionic-native/sms-retriever';

import { UserData } from '../../providers/user-data';
import {ConferenceData} from '../../providers/conference-data';
import { UserOptions } from '../../interfaces/user-options';
import { ToastController } from '@ionic/angular';
export interface OTPOptions {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
}


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  OTP:OTPOptions=  { a: '', b: '',c:'',d:'',e:'',f:'' };
  /* 
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/home');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
 */


  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  constructor(private toastCtrl: ToastController,public confData:ConferenceData) {

  }

 

  next(mobile) {
    this.showOTPInput = true;
    this.start(mobile);
  }

  start(mobile) {
console.log("mobile: "+mobile);
this.confData.sendPOSTRequest(mobile);
  }

  
  register() {
  console.log("OTP is "+this.OTP.a+this.OTP.b+this.OTP.c+this.OTP.d+this.OTP.e+this.OTP.f);
    this.confData.otpVerify(this.OTP.a+this.OTP.b+this.OTP.c+this.OTP.d+this.OTP.e+this.OTP.f);
    /* if (this.OTP != '') {
      this.presentToast('You are successfully registered', 'top', 1500);
    }
    else {
      this.presentToast('Your OTP is not valid', 'bottom', 1500);
    } */
  }


}
