import { Component, inject, input } from '@angular/core';
import { PriceChartComponent } from '../../components/price-chart/price-chart.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-graphe',
  imports: [PriceChartComponent],
  standalone: true,
  templateUrl: './graphe.component.html',
  styles: ``
})

export class GrapheComponent {
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.subscribe(p => {
      console.log("param2", p)
    })

    console.log("param2", this.route.snapshot.params['ticker'])

  }

}
