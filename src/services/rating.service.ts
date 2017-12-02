import { Injectable } from "@angular/core";

@Injectable()
export class RatingService {
  constructor() {}

  sendRating(id: string, value: number) {
    console.log('Mocking rating sending...');
  }
}
