import { Component, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  events: any[] = [];
  courses: any[] = [];
  coinBalance: number;
  
  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  categories = {
    slidesPerView: 2.5,
  };
  dailyCheck = {
    slidesPerView: 6,
  };
  constructor(public confData: ConferenceData,private userData: UserData) { 
    this.userData.getCoins().then((value)=>{
      this.coinBalance=value;
      console.log("Coin balance is "+this.coinBalance);
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.confData.getEvents().subscribe((events: any[]) => {
      this.events = events;
      console.log("events are "+this.events);
    });
    this.confData.getcourses().subscribe((courses: any[]) => {
      this.courses = courses;
      console.log("Courses are "+this.courses);
    });
    
  }
  thisHappen(){
    console.log("Button is clicked");
  }
  toAllEvents(){
    console.log("see all")
  }

}
