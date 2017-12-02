import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare const ymaps: any;

@IonicPage()
@Component({
  selector: 'page-zone-select',
  templateUrl: 'zone-select.html',
})
export class ZoneSelectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    const maps = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7
    });
  }

}

