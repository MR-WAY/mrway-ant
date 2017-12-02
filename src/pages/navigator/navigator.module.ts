import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigatorPage } from './navigator';

@NgModule({
  declarations: [
    NavigatorPage,
  ],
  imports: [
    IonicPageModule.forChild(NavigatorPage),
  ],
})
export class NavigatorPageModule {}
