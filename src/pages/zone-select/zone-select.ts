import { Component, Input, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersListPage } from "../orders-list/orders-list";

declare const ymaps: any;

@IonicPage()
@Component({
  selector: 'page-zone-select',
  templateUrl: 'zone-select.html',
})
export class ZoneSelectPage {
  selectedArea: string = 'Зона доставки не выбрана';
  isAreaSelected: boolean = false;
  zone: NgZone = null;
  map:any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  // TODO Add real coordinates from Native
  ionViewDidEnter() {
    const that = this;
    const init = () => {
      this.map = new ymaps.Map("map", {
        center: [55.6722, 37.6317],
        zoom: 16
      });
      const zoneFirst = new ymaps.Rectangle([
        [55.6712, 37.6297],
        [55.6732, 37.6337]
      ],
      {},
      {
        fillColor: '#0000FFFF',
        fillOpacity: 0.3,
        strokeColor: '#0000FF',
        strokeOpacity: 0.5,
        strokeWidth: 2,
        borderRadius: 0
      });
      const zoneSecond = new ymaps.Rectangle([
        [55.6732, 37.6297],
        [55.6762, 37.6367]
      ],
      {},
      {
        fillColor: '#25f052FF',
        fillOpacity: 0.3,
        strokeColor: '#25f052',
        strokeOpacity: 0.5,
        strokeWidth: 2,
        borderRadius: 0
      });
      const zoneThird = new ymaps.Rectangle([
        [55.6763, 37.6287],
        [55.6792, 37.6370]
      ],
      {},
      {
        fillColor: '#9e15f0FF',
        fillOpacity: 0.3,
        strokeColor: '#9e15f0',
        strokeOpacity: 0.5,
        strokeWidth: 2,
        borderRadius: 0
      });

      zoneFirst.events.add(['click'], () => {
        that.selectZone('1');
      });
      zoneSecond.events.add(['click'], () => {
        that.selectZone('2');
      });
      zoneThird.events.add(['click'], () => {
        that.selectZone('3');
      });

      this.map.geoObjects
        .add(zoneFirst)
        .add(zoneSecond)
        .add(zoneThird);
    };

    if (this.map === null) {
      ymaps.ready(init);
    }
  }

  @Input()
  selectZone(_selectedArea) {
    this.zone.run(() => {
      this.selectedArea = _selectedArea;
      this.isAreaSelected = true;
    });
  }

  approveZone() {
    this.navCtrl.push(OrdersListPage, {
      area: this.selectedArea,
    });
  }
}

