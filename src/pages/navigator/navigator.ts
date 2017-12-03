import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { FinishPage } from "../finish/finish";

declare const ymaps: any;

@Component({
  selector: 'page-navigator',
  templateUrl: 'navigator.html',
})
export class NavigatorPage {
  shopCoordinates: Array<number>;
  clientCoordinates: Array<number>;
  antCoordinates: Array<number>;
  type: string;
  map:any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController
  ) {
    this.type = navParams.get('type');
    if (this.type == 'toStore') {
      this.shopCoordinates = navParams.get('shopCoordinates');
    } else if (this.type === 'toClient') {
      this.clientCoordinates = navParams.get('clientCoordinates');
    }
    this.updateAntCoordinates();
  }

  // TODO Add real coordinates from Native
  ionViewDidEnter() {
    const init = () => {
      this.map = new ymaps.Map("navigatorMap", {
        center: [
          55.6702,
          37.6327
        ],
        zoom: 16
      });

      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          this.antCoordinates,
          (this.type === 'toStore') ? this.shopCoordinates : this.clientCoordinates,
        ],
        params: {
          routingMode: 'pedestrian'
        }
      }, {
        boundsAutoApply: true
      });

      this.map.geoObjects.add(multiRoute);
    };

    if (this.map === null && ymaps) {
      ymaps.ready(init);
    }
  }

  updateAntCoordinates() {
    this.antCoordinates = [
      55.6702,
      37.6327
    ]
  }

  // TODO Add QR scan
  checkInStore() {
    const alert = this.alertController.create({
      title: 'Сканирование QR',
      subTitle: 'Тут мы тип сосканировали успешно QR с терминала',
      buttons: [
        {
          text: 'Ок',
          handler: () => {
            this.navCtrl.setRoot(NavigatorPage, {
              type: 'toClient',
              clientCoordinates: [
                55.6762,
                37.6317
              ]
            });
          }
        }
      ]
    });
    alert.present();
  }

  checkInClient() {
    this.navCtrl.setRoot(FinishPage);
  }

}
