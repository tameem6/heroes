import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const heroes = [
      {id: 1, name: 'BloodSeeker'},
      {id: 2, name: 'Dark Willow'},
      {id: 3, name: 'Drow Ranger'},
      {id: 4, name: 'Storm Spirit'},
      {id: 5, name: 'BeastMaster'},
      {id: 6, name: 'Centaur Warrunner'},
      {id: 7, name: 'Warlock'},
      {id: 8, name: 'Axe'},
      {id: 9, name: 'Mars'},
      {id: 10, name: 'Slark'}
    ]
    return {heroes};
  }
  genId(heroes: Hero[]): number {
    return heroes.length > 0? Math.max(...heroes.map(hero => hero.id))+1 : 11;
  }
  constructor() { }
}
