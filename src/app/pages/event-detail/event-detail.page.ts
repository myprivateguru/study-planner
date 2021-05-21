import { Component, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  book: any;
  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.courses && data.courses[0]) {
        const bookId = this.route.snapshot.paramMap.get('id');
        console.log("my id is "+bookId);
        for (const book of data.courses) {
          console.log(book);
          
            if (book.id == bookId) {
              this.book = book;
              console.log("i entered into details"+book.courseName);
              break;
            }
          
        }
      }
    });
  }

  ngOnInit() {
  }

}
