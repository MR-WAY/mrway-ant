import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NouisliderModule } from 'ng2-nouislider';
import { Ionic2RatingModule } from 'ionic2-rating';

import { MyApp } from './app.component';
import { StartPage } from "../pages/start/start";
import { ZoneSelectPage } from "../pages/zone-select/zone-select";
import { NavigatorPage } from "../pages/navigator/navigator";
import { OrdersListPage } from "../pages/orders-list/orders-list";
import { FinishPage } from "../pages/finish/finish";

import { UptimeService } from "../services/uptime.service";
import { MapService } from "../services/map.service";
import { RatingService } from "../services/rating.service";


@NgModule({
  declarations: [
    MyApp,
    StartPage,
    ZoneSelectPage,
    NavigatorPage,
    OrdersListPage,
    FinishPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NouisliderModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    ZoneSelectPage,
    NavigatorPage,
    OrdersListPage,
    FinishPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UptimeService,
    MapService,
    RatingService,
  ]
})
export class AppModule {}
