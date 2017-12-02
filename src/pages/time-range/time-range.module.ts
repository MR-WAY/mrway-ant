import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeRangePage } from './time-range';

@NgModule({
  declarations: [
    TimeRangePage,
  ],
  imports: [
    IonicPageModule.forChild(TimeRangePage),
  ],
})
export class TimeRangePageModule {}
