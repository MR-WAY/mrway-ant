import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavigatorPage } from "../navigator/navigator";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-orders-list',
  templateUrl: 'orders-list.html',
})
export class OrdersListPage {
  areaNumber: number = null;
  orders: Array<any> = null;
  zone: NgZone = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient
  ) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.areaNumber = navParams.get('area');
  }

  // TODO Replace by server request
  ionViewDidLoad() {
    this.http
      .get('/api/Courier/Order')
      .subscribe(
        data => this.processData(data),
        error => console.error(error)
      );
  }

  processData(data) {
    const mutatedData = data.map(_item => ({
      id: _item.id,
      orderStatus: _item.orderStatus,
      deliveryStatus: _item.deliveryStatus,
      number: _item.id.split('').filter(_char => _char.match(/[0-9]/)).join('').slice(0, 5),
      clientCoordinates: [
        _item.latitude,
        _item.longitude,
      ],
      storeCoordinates: [
        _item.store.latitude,
        _item.store.longitude
      ],
      distance: Math.floor(Math.random() * 200) / 100,
    }));
    this.orders = mutatedData;
      // .filter(_item => _item.deliveryStatus !== 'accepted');
  }

  // TODO Add server request
  requestTakeOrder(id) {
    this.http
      .post(`api/Courier/Order/Accept/${id}`, {})
      .subscribe(
        () => {
          const item = this.orders.find(_order => _order.id === id);
          this.navCtrl.setRoot(NavigatorPage, {
            type: 'toStore',
            shopCoordinates: item.shopCoordinates
          });
        }
      );

  }

}
