import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header>{{ title() }}</app-header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = signal('angular19Tuto');
}
