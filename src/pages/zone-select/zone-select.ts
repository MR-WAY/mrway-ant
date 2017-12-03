import { Component, Input, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrdersListPage } from "../orders-list/orders-list";
import { MapService } from "../../services/map.service";

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

  ngOnInit() {
    try {
      const foundedArea = localStorage.getItem('mrway_area');
      if (foundedArea) {
        this.selectedArea = foundedArea;
        this.approveZone();
      }
    } catch (error) {}
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
          [55.6792, 37.6370],
          '#0000FF',
        );
      zoneFirst.events.add(['click'], () => {
        this.selectZone('1');
      });
    };

    MapService.checkAndInit(this.map, init);
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
    localStorage.setItem('mrway_area', this.selectedArea);
    this.navCtrl.push(OrdersListPage, {
      area: this.selectedArea,
    });
  }
}

