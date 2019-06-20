import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../hero-list';

@Component({
  selector: 'app-tour-heroes',
  templateUrl: './tour-heroes.component.html',
  styleUrls: ['./tour-heroes.component.css']
})
export class TourHeroesComponent implements OnInit {
  heroes = HEROES;
  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  constructor() { }

  ngOnInit() {
  }

}
