import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import{ AppComponent} from '../../app.component';

@Component({
  selector: 'app-refer-us',
  templateUrl: './refer-us.page.html',
  styleUrls: ['./refer-us.page.scss'],
})
export class ReferUsPage implements OnInit {
  loggedIn = false;
  coinBalance: number;
  today: string;
  ddd:string;
  
  
  constructor(private route: ActivatedRoute, private appcom: AppComponent,
    public actionSheetCtrl: ActionSheetController,private userData: UserData,
    private alert: AlertController) { 
      this.userData.getCoins().then((value)=>{
        this.coinBalance=value;
        console.log("Coin balance is "+this.coinBalance);
      })
    
     
    }

  ngOnInit() {
    const now=new Date();
    this.today=now.toISOString().slice(0,10);
    this.userData.addDate(this.today);
    console.log("todays Date is "+ this.today);
  }
  
  segmentModel = "earn";
  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }
  async getCoins() {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share Now' ,
      cssClass: 'my-custom-class',
      buttons: [
                
        {
          text: `let it go`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:');
          }
        },
        
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'View',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
  async inviteNow(){
    const alert = await this.alert.create({
      header: 'Share with your Friends',
      message: `<img src="../../assets/travel.svg" class="card-alert">`,
      buttons: ['Dismiss']
})

      await alert.present();
  }
 coinsForlogIn(){ 
   const manngo= this.userData.isLoggedIn();
   manngo.then((value)=>{
     
     if(value==true){
      console.log("You will get 50 Day Coins");
      this.userData.getCoins();
      this.dailyCoins();
     }
     else{
      console.log("False");
     }

   })
 }
 dailyCoins(){
  this.userData.addDate(this.today);

 }
 redeemCoins(){
   this.userData.setCoins(-80);
 }

}
