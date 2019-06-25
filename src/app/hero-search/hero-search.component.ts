import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }
  search(term: string): void {
    this.searchTerms.next(term);

  }
  ngOnInit() {
    this.heroes$= this.searchTerms.pipe(
      debounceTime(300),  //debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string. You'll never make requests more frequently than 300ms.
      distinctUntilChanged(), //distinctUntilChanged() ensures that a request is sent only if the filter text changed.
      switchMap((term: string) => this.heroService.searchHeroes(term)) //switchMap() calls the search service for each search term that makes
    );                                                                 // it through debounce and distinctUntilChanged. It cancels and discards previous search observables, returning only the latest search service observable.
  }


}
