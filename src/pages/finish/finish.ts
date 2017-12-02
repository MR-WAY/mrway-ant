import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrdersListPage } from "../orders-list/orders-list";
import { RatingService } from "../../services/rating.service";

@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html',
})
export class FinishPage {
  id: string;
  rate: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ratingService: RatingService) {
    this.id = navParams.get('id');
  }

  finishOrder() {
    this.navCtrl.setRoot(OrdersListPage);
    this.ratingService.sendRating(this.id, this.rate);
  }

}
