import { Injectable } from "@angular/core";

@Injectable()
export class UptimeService {
  startTime: number;
  endTime: number;

  constructor() {}

  setUptime(_startTime, _endTime) {
    this.startTime = _startTime;
    this.endTime = _endTime;
  }
}
