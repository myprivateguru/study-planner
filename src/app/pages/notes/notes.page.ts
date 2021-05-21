import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  note: any;
  chapter:any;
  chapters: any;
  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.events && data.events[0]) {
        const noteId = this.route.snapshot.paramMap.get('id');
        console.log("my id is "+noteId);
        for (const note of data.events) {
          console.log(note);
          
            if (note.id == noteId) {
              this.note = note;
              this.chapters=note.chapters;
              
              console.log("i entered into details "+note.eventName);
              break;
            }
          
        }
      }
    });
  }
  

}
