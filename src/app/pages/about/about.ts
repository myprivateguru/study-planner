import { Component, OnInit } from '@angular/core';
import {ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage implements OnInit{
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };
  slotData: Object;
  districts: any;
  
  constructor(public confData : ConferenceData ) { 

    this.confData.getSlotData()
    .subscribe(data=>{
      console.log("run Severice Slot Data");
      this.slotData=data;
      console.log("so the data is "+ this.slotData);
    })
  }

  ngOnInit() {

   
  }
}
