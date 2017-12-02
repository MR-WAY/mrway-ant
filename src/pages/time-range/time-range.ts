import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ZoneSelectPage } from "../zone-select/zone-select";

@IonicPage()
@Component({
  selector: 'page-time-range',
  templateUrl: 'time-range.html',
})
export class TimeRangePage {
  timeRangeMin: number = 0;
  timeRangeMax: number = 1;
  selectedRange: Array<Number> = [0, 1];

  sliderConfig: any = {
    start: this.selectedRange,
    connect: [false, true, false],
    step: 1,
    range: {
      min: this.timeRangeMin,
      max: this.timeRangeMax,
    },
    pips: {
      mode: 'count',
      density: 2,
      values: 6,
      stepped: true
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const date = new Date();
    this.timeRangeMin = date.getHours();
    this.timeRangeMax = this.timeRangeMin + 6;

    this.updateSliderConfig();
  }

  updateSliderConfig() {
    this.sliderConfig.range = {
      min: this.timeRangeMin,
      max: this.timeRangeMax,
    };
    this.selectedRange = [
      this.timeRangeMin,
      this.timeRangeMin + 3,
    ];
  }

  // TODO add request to server
  requestTimeRange() {
    this.navCtrl.push(ZoneSelectPage);
  }

}
