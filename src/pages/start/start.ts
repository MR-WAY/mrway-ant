import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimeRangePage } from "../time-range/time-range";

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // TODO add server request
  requestStart() {
    this.navCtrl.push(TimeRangePage);
  }

}
