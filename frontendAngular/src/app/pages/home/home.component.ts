import { Component } from '@angular/core';
import { FundamentalChartsComponent } from '../../components/fundamental-charts/fundamental-charts.component';

@Component({
  selector: 'app-home',
  imports: [FundamentalChartsComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {}
