import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  standalone: true,
  template: `
    <button
      (click)="btnClick.emit()"
      class="bg-blue-500 px-5 py-2 rounded-md text-white w-full shadow-md hover:opacity-90"
    >
      <span>{{ label() }}</span>
    </button>
  `,
  styles: ``,
})
export class PrimaryButtonComponent {
  label = input('');
  btnClick = output();
}
