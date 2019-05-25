import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';
import { Hero } from '../hero';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
  this.getHeroes();
  }

  getHeroes(): void {
  this.heroService.getHeroes().subscribe(
   // heroes123为getHeroes()返回的Observable <Hero[]>对象，即HEROES
    heroes123 => this.heroes = heroes123.slice(0, 4)
  );
}

}
