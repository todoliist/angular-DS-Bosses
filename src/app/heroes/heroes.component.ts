import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';

@Component({

  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];

 // 构造函数不应该做任何事
constructor(private heroService: HeroService) { }

ngOnInit() {
  this.getHeros();
  }

getHeros(): void {
  this.heroService.getHeroes().subscribe(
   // heroesabc为Observable返回的数组HEROES，所以可以随便命名
   // 再采用回调函数的形式把HEROES传给heroes属性
    heroesabc => this.heroes = heroesabc);
}

add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Hero)
  // 虽然addHero()通过http把name as Hero加入到heroesUrl,但还并没有把它添加到heroescomponent中
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}

delete(hero: Hero): void {
this.heroes = this.heroes.filter(h => h !== hero);
this.heroService.deleteHero(hero).subscribe();
}


}
