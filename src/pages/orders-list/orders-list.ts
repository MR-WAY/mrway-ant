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
  requestFailed: boolean = false;

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
    this.fetchOrders();
  }

  fetchOrders() {
    this.http
      .get('/api/Courier/Order')
      .subscribe(
        (data) => {
          this.requestFailed = false;
          this.processData(data);
        },
        error => this.requestFailed = true
      );
  }

  processData(data) {
    this.orders = data
      .map(_item => ({
        id: _item.id,
        orderStatus: _item.orderStatus,
        deliveryStatus: _item.deliveryStatus,
        number: _item.id.split('-')[0],
        clientCoordinates: [
          _item.latitude,
          _item.longitude,
        ],
        storeCoordinates: [
          _item.store.latitude,
          _item.store.longitude
        ],
        distance: Math.floor(Math.random() * 200) / 100,
      }))
    .filter(_item => _item.deliveryStatus !== 'delivered');
  }

  requestTakeOrder(id) {
    const item = this.orders.find(_order => _order.id === id);
    if (item.deliveryStatus === 'accepted') {
      this.goToOrder(item);
    } else {
      this.http
        .post(`api/Courier/Order/Accept/${id}`, {})
        .subscribe(
          () => {
            this.goToOrder(item);
          }
        );
    }
  }

  goToOrder(item) {
    this.navCtrl.setRoot(NavigatorPage, {
      type: 'toStore',
      storeCoordinates: item.storeCoordinates,
      clientCoordinates: item.clientCoordinates,
      id: item.id,
    });
  }

}
