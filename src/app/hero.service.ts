import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})

export class HeroService {
  private heroesUrl = 'api/heroes';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  getHeroes(): Observable<Hero[]> {
    // this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('Fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    //TODO: Send message after getting hero
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl,hero, httpOptions).pipe(
      tap(_ => this.log(`Updated hero, id = ${hero.id}`)),
      catchError(this.handleError<any>('update Hero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added hero with id = ${newHero.id}`))
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const id = typeof hero === 'number'? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_ => this.log(`Deleted Hero ID = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  //Handle http operations that failed
  private handleError<T>(operation='operation', result? : T){
    return(error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed. ${error.message}`);
      return of(result as T);
    }
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}