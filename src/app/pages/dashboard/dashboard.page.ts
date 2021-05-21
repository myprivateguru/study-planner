import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  segmentModel = "daily";
  constructor() { }

  ngOnInit() {
  }
  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }

}
