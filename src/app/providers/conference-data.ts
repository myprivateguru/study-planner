import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import sha256 from 'crypto-js/sha256';
import { UserData } from './user-data';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

export interface InputOptions {
  otp: string;
  txn_Id: string;
}


@Injectable({
  providedIn: 'root'
})
export class ConferenceData {
  OTP:InputOptions=  { otp: '',txn_Id:''}
  data: any;
  sampleData: any;
  TOKEN_data: any;

  constructor(public http: HttpClient, public user: UserData,public storage: Storage,
    private toastCtrl: ToastController) {}

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('https://raw.githubusercontent.com/gurujiathome/datademo/main/data.json')
        .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data;

    // loop through each day in the schedule
    this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
          session.speakers = [];
          if (session.speakerNames) {
            session.speakerNames.forEach((speakerName: any) => {
              const speaker = this.data.speakers.find(
                (s: any) => s.name === speakerName
              );
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  getTimeline(
    dayIndex: number,
    queryText = '',
    excludeTracks: any[] = [],
    segment = 'all'
  ) {
    return this.load().pipe(
      map((data: any) => {
        const day = data.schedule[dayIndex];
        day.shownSessions = 0;

        queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

        day.groups.forEach((group: any) => {
          group.hide = true;

          group.sessions.forEach((session: any) => {
            // check if this session should show or not
            this.filterSession(session, queryWords, excludeTracks, segment);

            if (!session.hide) {
              // if this session is not hidden then this group should show
              group.hide = false;
              day.shownSessions++;
            }
          });
        });

        return day;
      })
    );
  }

  filterSession(
    session: any,
    queryWords: string[],
    excludeTracks: any[],
    segment: string
  ) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segment is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getSpeakers() {
    return this.load().pipe(
      map((data: any) => {
        return data.speakers.sort((a: any, b: any) => {
          const aName = a.name.split(' ').pop();
          const bName = b.name.split(' ').pop();
          return aName.localeCompare(bName);
        });
      })
    );
  }

  getTracks() {
    return this.load().pipe(
      map((data: any) => {
        return data.tracks.sort();
      })
    );
  }
  getEvents(){
    return this.load().pipe(
      map((data:any)=>{
        return data.events.sort();
      })
    )
  }
  getcourses(){
    return this.load().pipe(
      map((data:any)=>{
        return data.courses.sort();
      })
    )
  }

  getMap() {
    return this.load().pipe(
      map((data: any) => {
        return data.map;
      })
    );
  }

  async presentToast(message, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

getSlotData(){
  return this.http.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/11');
}
bookSlots(){
  return this.http.get('assets/data/slots.json');
  // return this.http.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=110001&date=31-03-2021');
}
sendPOSTRequest(mobile){
  /* var headers= new Headers();
  headers.append("Accept",'application/json');
  headers.append('Content-Type','application/json'); */
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Accept":'application/json'
      })
    };
    let postData={
      "mobile":mobile
    }
   return this.http.post("https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",postData,httpOptions)
    .subscribe((data:any)=>{
      this.sampleData=data;
      this.presentToast('TXN ID :'+this.sampleData.txnId,'bottom',1500);
      console.log("data  "+this.sampleData.txnId);
      this.setTransaction(this.sampleData.txnId);
      console.log(['_body']);
    },error=>{console.log(error);
    });
}

otpVerify(data){
  this.getTransaction().then(sup=>{
    this.OTP.txn_Id=sup;
    this.OTP.otp=sha256(data);
    console.log("otp : "+this.OTP.otp);
    console.log("txnId : "+this.OTP.txn_Id);
    this.postOTP(this.OTP.otp,this.OTP.txn_Id);
  });
  
}

postOTP(otp,txnId){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Accept":'application/json'
      })
    };
    let postData={
      "otp ": otp,
      "txnId ": txnId
    }

    console.log("Post data "+otp+" "+txnId);
    this.http.post("https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",postData,httpOptions)
    .subscribe((data) =>{
      this.TOKEN_data=data;
      this.presentToast(this.TOKEN_data.token,'bottom',1500);
      console.log("token is  "+this.TOKEN_data.token);
      console.log(['_body']);
    },error=>{console.log(error);
      this.presentToast(error.error,'bottom',1500);
    });

}
setTransaction(txnId: string): Promise<any> {
  return this.storage.set('TxnId', txnId);
}

getTransaction(): Promise<string> {
  return this.storage.get('TxnId').then((value) => {
   
    console.log("transaction val "+value)
    return value;
  });
}
}
