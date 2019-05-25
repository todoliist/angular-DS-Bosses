import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
// $ 是一个命名惯例，用来表明 heroes$ 是一个 Observable，而不是数组。
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  // Subject 既是可观察对象的数据源，本身也是 Observable。 你可以像订阅任何 Observable 一样订阅 Subject。
  // 你还可以通过调用它的 next(value) 方法往 Observable 中推送一些值

  search(term: string): void {
    this.searchTerms.next(term);
  }


  // 为什么要把searchTerm.pipe放在ngOnInit()里？如果后来在搜索栏重新键入新的值，那时component已经Init了，为什么pipe里的方法还有效？
  ngOnInit(): void {
    // 每次键入term，会在heroService查找此term,并返回成一个新的observable给heroes$,所以heroes$为搜索结果的集合
    // .pipe就像进入管道里，要对里面的stream用多种方法进行处理
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes，此term123即为search(term: string)中的term
      switchMap((term123) => this.heroService.searchHeroes(term123)),
    );
  }
}
