import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

    createDb() {
      const heroes = [
        { id: 1, name: 'Dark Sun Gwyndolin' },
        { id: 2, name: 'Demon Firesage' },
        { id: 3, name: 'Dragon Slayer' },
        { id: 4, name: 'Four Kings' },
        { id: 5, name: 'Centipede Demon' },
        { id: 6, name: 'Asylum Demon ' },
        { id: 7, name: 'Gaping Dragon' },
        { id: 8, name: 'Capra Demon' },
        { id: 9, name: 'Chaos Witch Quelaag' },
        { id: 10, name: 'Bell Gargoyle' }
      ];
      return {heroes};
    }
  /*
    //给heroes中每一个hero赋一个id,
    genId(heroes:Hero[]):number{
      //return的不是heroes.length,而是后面根据条件产生的ID数
    return heroes.length>0? Math.max(...heroes.map(hero=>hero.id))+1:11;
    }
    */
}
