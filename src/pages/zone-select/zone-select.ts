import { Component, Input, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrdersListPage } from "../orders-list/orders-list";
import { MapService } from "../../services/map.service";

// declare const ymaps: any;

@Component({
  selector: 'page-zone-select',
  templateUrl: 'zone-select.html',
})
export class ZoneSelectPage {
  selectedArea: string = 'Зона доставки не выбрана';
  isAreaSelected: boolean = false;
  zone: NgZone = null;
  map:any = null;

  constructor(
    public navCtrl: NavController,
  ) {
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  // TODO Add real coordinates from Native
  ionViewDidEnter() {
    const init = () => {
      this.map = MapService
        .drawMap('map', [55.6722, 37.6317]);
      const zoneFirst = MapService
        .drawRectangle(
          this.map,
          [55.6712, 37.6297],
          [55.6732, 37.6337],
          '#0000FF',
        );
      const zoneSecond = MapService
        .drawRectangle(
          this.map,
          [55.6732, 37.6297],
          [55.6762, 37.6367],
          '#25f052',
        );
      const zoneThird = MapService
        .drawRectangle(
          this.map,
          [55.6763, 37.6287],
          [55.6792, 37.6370],
          '#9e15f0',
        );
      zoneFirst.events.add(['click'], () => {
        this.selectZone('1');
      });
      zoneSecond.events.add(['click'], () => {
        this.selectZone('2');
      });
      zoneThird.events.add(['click'], () => {
        this.selectZone('3');
      });
    };

    init();
  }

  @Input()
  selectZone(_selectedArea) {
    this.zone.run(() => {
      this.selectedArea = _selectedArea;
      this.isAreaSelected = true;
    });
  }

  // TODO Add server request
  approveZone() {
    this.navCtrl.push(OrdersListPage, {
      area: this.selectedArea,
    });
  }
}

