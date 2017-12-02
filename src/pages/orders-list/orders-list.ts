import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigatorPage } from "../navigator/navigator";

@IonicPage()
@Component({
  selector: 'page-orders-list',
  templateUrl: 'orders-list.html',
})
export class OrdersListPage {
  areaNumber: number = null;
  orders: Array = null;
  zone: NgZone = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.areaNumber = navParams.get('area');
  }

  // TODO Replace by server request
  ionViewDidLoad() {
    setTimeout(() => {
      this.orders = [];
      this.zone.run(() => {
        this.orders.push({
          id: 1,
          name: 'Доставка продуктов из магазина «Умка»',
          time: 3,
          price: 150,
          address: '3-й Нагатинский пр-д, 5к1',
          shopCoordinates: [
            55.6722,
            37.6317
          ],
          shopTitle: 'Умка',
        });
      });
    }, 2000);
  }

  // TODO Add server request
  requestTakeOrder(id) {
    const item = this.orders.find(_order => _order.id === id);
    this.navCtrl.setRoot(NavigatorPage, {
      type: 'toStore',
      address: item.address,
      shopTitle: item.shopTitle,
      shopCoordinates: item.shopCoordinates
    });
  }

}
