import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NouisliderModule } from 'ng2-nouislider';

import { MyApp } from './app.component';
import { StartPage } from "../pages/start/start";
import { TimeRangePage } from "../pages/time-range/time-range";
import { ZoneSelectPage } from "../pages/zone-select/zone-select";
import { NavigatorPage } from "../pages/navigator/navigator";
import { OrdersListPage } from "../pages/orders-list/orders-list";
import { FinishPage } from "../pages/finish/finish";

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    TimeRangePage,
    ZoneSelectPage,
    NavigatorPage,
    OrdersListPage,
    FinishPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NouisliderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    TimeRangePage,
    ZoneSelectPage,
    NavigatorPage,
    OrdersListPage,
    FinishPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
