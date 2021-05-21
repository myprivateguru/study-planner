import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  coins:number=0;
  favorites: string[] = [];
  STORAGE_KEY='dailyDates';
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(public toastController: ToastController,
    public storage: Storage
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }
  hasDate(sessionDate: string) :Promise<boolean>{
    /* console.log(" has date fn "+this.STORAGE_KEY.indexOf(sessionDate));
    
    return (this.STORAGE_KEY.indexOf(sessionDate) > -1); */
    return this.getAllDates().then(result=>{
      console.log("result  is"+result);
      for(const res of result){
        if(res==sessionDate){
          console.log("I am in ");
        }else {
          this.setCoins(80);
          console.log("I am Out");
        }
      }
      return result&& result.indexOf(sessionDate)>-1;
    })
  }
  addDate(sessionDate: string) {
   return this.getAllDates().then(result=>{
  console.log("my todays date   "+sessionDate);
    if(result){
      
      var index=result.indexOf(sessionDate);
      console.log(index);
      if(index>-1){
        this.presentToast("Already used date");
        
      }else{
      result.push(sessionDate);
      this.storage.set(this.STORAGE_KEY,result);
      this.setCoins(80);
      this.presentToast("Successfully received coins for logged in");
      }
    }else{
      this.storage.set(this.STORAGE_KEY,[sessionDate]);
    }
     
   })
  }
  unDate(sessionDate){
    return this.getAllDates().then(result=>{
      if(result){
        var index=result.indexOf(sessionDate);
        result.splice(index,1);
        return this.storage.set(this.STORAGE_KEY,result)
      }
    })

  }
  getAllDates(){
    return this.storage.get(this.STORAGE_KEY);
  }
  async presentToast(Msg) {
    const toast = await this.toastController.create({
      message: Msg,
      duration: 2000
    });
    toast.present();
  }

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }


  setCoins(coins: number){
    this.getCoins().then((value)=>{
      value=value+coins;
      console.log("updated coins "+value);
      return this.storage.set('coins', value)
      
    })
    
  }

  getCoins(): Promise<number> {
    return this.storage.get('coins').then((value) => {
      console.log("your coins " +value);
      return value;
    });
  }
}
