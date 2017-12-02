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

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    TimeRangePage,
    ZoneSelectPage,
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
