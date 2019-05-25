import { Injectable } from '@angular/core';
import {tap, catchError} from 'rxjs/operators';
import { Hero } from './hero';
import { Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
  // @Injectable下写成 providedIn: UserModule,就可以只有当消费方导入了你创建的 UserModule 时才让 此Service 在应用中生效，当没有人注入它时，该服务就可以被摇树优化掉。
// HeroService 向远端服务器发起请求时,
})
export class HeroService {

  // 把服务器上英雄数据资源的访问地址 heroesURL 定义为 :base/:collectionName 的形式。
// 这里的 base 是要请求的资源，而 collectionName 是 in-memory-data-service.ts 中的英雄数据对象。
  private heroesUrl = 'api/heroes';  // URL to web api

constructor(private http: HttpClient,
            private messageService: MessageService) { }


private log(message: string) {
  this.messageService.add(`BossService:${message}`);
}


// of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组
// 通常，Observable 可以在一段时间内返回多个值。 但来自 HttpClient 的 Observable 总是发出一个值，然后结束，再也不会发出其它值。
// 等待 Observable 发出这个英雄数组，这可能立即发生，也可能会在几分钟之后。
// 然后，subscribe 函数把这个英雄数组传给这个回调函数，该函数把英雄数组赋值给组件的 heroes 属性。
getHeroes(): Observable <Hero[]> {
  this.messageService.add('fetched darksoul1 bosses');
 // HTTP服务不需要of
 // There is a pipe method built into Observable now at Observable.prototype.pipe that сan be used to
 // compose the operators in similar manner to what you're used to with dot-chaining (shown below).
 // source$.pipe(
 // filter(x => x % 2 === 0),
 // map(x => x + x),
 // scan((acc, x) => acc + x, 0)
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched bosses')),
      catchError(this.handleError<Hero[]>('getBosses', []))
    );
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`fetched Boss id=${id}`);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched Boss id=${id}`)),
        catchError(this.handleError<Hero>(`getBoss id=${id}`))
    );

  }



updateHero(hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated boss id=${hero.id}`)),
      catchError(this.handleError<any>('updateBoss'))
    );
}

addHero(hero: Hero): Observable<Hero> {

  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((hero2) => this.log(`added Boss w/ id=${hero2.id}`)),
    catchError(this.handleError<Hero>('addBoss'))
    );
}


/** DELETE: delete the hero from the server */
deleteHero(hero: Hero | number): Observable<Hero> {
  // id是hero类型还是number类型
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;
  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted boss id=${id}`)),
    catchError(this.handleError<Hero>('deleteBoss'))
  );
}

searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 如果没有搜索词(输入的空格），该方法立即返回一个空数组
      return of ([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(_ => this.log(`found bosses matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchBosses', []))
    );


}


}
