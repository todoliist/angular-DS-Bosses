import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// 为什么没把routes放到下面的class中作为其属性？
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
exports: [RouterModule],
// forRoot()创建一个带有所有路由器服务提供商和指令的模块
// 这个方法之所以叫 forRoot()，是因为你要在应用的root(顶级)配置这个路由器
// forRoot() 方法会提供路由所需的服务提供商和指令，还会基于浏览器的当前 URL 执行首次导航。
imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {



}
