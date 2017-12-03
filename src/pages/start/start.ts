import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UptimeService } from "../../services/uptime.service";
import { ZoneSelectPage } from "../zone-select/zone-select";

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  defaultRange: Array<number> = [10, 17];
  selectedRange: Array<Number> = [0, 1];
  sliderConfig: any = {
    start: this.selectedRange,
    connect: [false, true, false],
    step: 1,
    range: {
      min: 0,
      max: 24,
    },
    pips: {
      mode: 'count',
      density: 6,
      values: 6,
      stepped: true
    }
  };

  constructor(
    public navCtrl: NavController,
    private uptimeService: UptimeService) {
  }

  ngOnInit() {
    try {
      const foundedRange = JSON.parse(localStorage.getItem('mrway_uptime'));
      if (foundedRange) {
        this.selectedRange = foundedRange;
        this.requestStart();
      }
    } catch (error) {}
    this.updateSliderConfig();
  }

  updateSliderConfig() {
    this.sliderConfig.start = this.defaultRange;
    this.selectedRange = [
      this.defaultRange[0],
      this.defaultRange[1],
    ];
  }

  // TODO add server request
  requestStart() {
    localStorage.setItem('mrway_uptime', JSON.stringify(this.selectedRange));
    this.uptimeService.setUptime(
      this.selectedRange[0],
      this.selectedRange[1]
    );
    this.navCtrl
      .push(ZoneSelectPage);
  }
}
