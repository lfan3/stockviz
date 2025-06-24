import { Component } from '@angular/core';
// import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
  selector: 'app-header',
  // imports: [PrimaryButtonComponent],
  standalone: true,
  template: `
    <div
      class="px-4 py-3 bg-slate-100 shadow-md font-bold flex justify-between items-center text-blue-700"
    >
      <span class="text-xl">StockViz</span>
      <!-- <app-primary-button label="chart" (btnClick)="onBtnClick()" /> -->
    </div>
  `,
  styles: ``,
})
export class HeaderComponent {
  onBtnClick() {
    console.log('clicked');
  }
}
