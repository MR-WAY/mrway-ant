import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZoneSelectPage } from './zone-select';

@NgModule({
  declarations: [
    ZoneSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(ZoneSelectPage),
  ],
})
export class ZoneSelectPageModule {}
