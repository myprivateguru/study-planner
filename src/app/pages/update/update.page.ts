import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  updateNow(){
    window.open("https://drive.google.com/file/d/1P-OBWBWtmuvFqvmlPjq6DLmMirjz_m1M/view?usp=sharing");
  }

}
