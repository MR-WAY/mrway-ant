import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { FinishPage } from "../finish/finish";
import { HttpClient } from "@angular/common/http";

declare const ymaps: any;

@Component({
  selector: 'page-navigator',
  templateUrl: 'navigator.html',
})
export class NavigatorPage {
  id: string;
  storeCoordinates: Array<number>;
  clientCoordinates: Array<number>;
  antCoordinates: Array<number>;
  type: string;
  map:any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    private http: HttpClient,
  ) {
    this.type = navParams.get('type');
    this.id = navParams.get('id');
    if (this.type == 'toStore') {
      this.storeCoordinates = navParams.get('storeCoordinates');
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
          (this.type === 'toStore') ? this.storeCoordinates : this.clientCoordinates,
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
      55.6722,
      37.6317
    ];
  }

  checkInStore() {
    const alert = this.alertController.create({
      title: 'Подтверждение',
      subTitle: 'Введите четырехзначный код с экрана заказа на смарт терминале',
      inputs: [
        {
          name: 'secureCode',
          placeholder: '1234',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Ок',
          handler: ({ secureCode }) => {
            this.checkSecureCode(secureCode);
          }
        },
        {
          text: 'Отмена',
          role: 'cancel'
        },
      ]
    });
    alert.present();
  }

  checkSecureCode(secureCode) {
    this.http
      .post(`http://178.62.241.56/api/Courier/Order/TakeAway/${this.id}?code=${secureCode}`, {})
      .subscribe(
        () => {
          this.goToClient();
        },
        () => {
          alert('Что-то не так...');
        }
      );
  }

  goToClient() {
    this.navCtrl.setRoot(NavigatorPage, {
      type: 'toClient',
      id: this.id,
      clientCoordinates: [
        55.6762,
        37.6317
      ]
    });
  }

  checkInClient() {
    this.http
      .post(`http://178.62.241.56/api/Courier/Order/Delivery/${this.id}`, {})
      .subscribe(
        () => {
          this.goToFinish();
        },
        () => {
          alert('Что-то не так...');
        }
      );
  }

  goToFinish() {
    this.navCtrl.setRoot(FinishPage);
  }

}
