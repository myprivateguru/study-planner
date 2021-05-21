import { Component, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.page.html',
  styleUrls: ['./all-events.page.scss'],
})
export class AllEventsPage implements OnInit {
  events: any[] = [];
  courses: any[] = [];
  constructor(public confData: ConferenceData) { }

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

}
