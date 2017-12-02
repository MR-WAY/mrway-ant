import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersListPage } from "../orders-list/orders-list";

@IonicPage()
@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html',
})
export class FinishPage {
  rate: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  finishOrder() {
    this.navCtrl.setRoot(OrdersListPage);
  }

}
