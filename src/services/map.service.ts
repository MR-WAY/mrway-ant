import { Injectable } from "@angular/core";

declare const ymaps: any;

@Injectable()
export class MapService {
  constructor() {}

  static checkAndInit(map: any, callback) {
    try {
      if (map === null && ymaps) {
        callback();
      }
    } catch(error) {
      alert('Что-то не так с Яндекс Картами');
    }
  }

  static drawMap(id: string, centerCoordinates: Array<number>):any {
    return new ymaps.Map(id, {
      center: centerCoordinates,
      zoom: 16
    });
  }

  static drawRectangle(
    map: any,
    topLeftCoordinates,
    bottomRightCoordinates,
    color,
  ): any {
    const rectangle = new ymaps.Rectangle([
      topLeftCoordinates,
      bottomRightCoordinates
    ],
    {},
    {
      fillColor: color + 'FF',
      fillOpacity: 0.3,
      strokeColor: color,
      strokeOpacity: 0.5,
      strokeWidth: 2,
      borderRadius: 0
    });
    map.geoObjects
      .add(rectangle);
    return rectangle;
  }
}
