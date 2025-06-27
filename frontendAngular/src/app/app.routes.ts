import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GrapheComponent } from './pages/graphe/graphe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chart/:ticker', component: GrapheComponent }
];
