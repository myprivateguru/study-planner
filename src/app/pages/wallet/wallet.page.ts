import { Component, OnInit } from '@angular/core';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  coinBalance: number;
  constructor(private userData: UserData) {
    this.userData.getCoins().then((value)=>{
      this.coinBalance=value;
      console.log("Coin balance is "+this.coinBalance);
    })
   }

  ngOnInit() {
  }

}
