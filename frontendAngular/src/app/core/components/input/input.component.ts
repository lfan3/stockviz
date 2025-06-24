import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  Input,
  model,
  output,
  Output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  Subject,
  debounceTime,
  throttleTime,
  distinctUntilChanged,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  template: `
    <mat-form-field appearance="outline">
      <input
        matInput
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onBlur()"
        class="text-center"
      />
      @if (prefixIcon()) {
      <mat-icon matPrefix>{{ prefixIcon() }}</mat-icon>
      } @if (suffixIcon()) {
      <mat-icon matSuffix>{{ suffixIcon() }}</mat-icon>
      } @if (hint()) {
      <mat-hint>{{ hint() }}</mat-hint>
      } @if (error()) {
      <mat-error>{{ error() }}</mat-error>
      }
    </mat-form-field>
  `,
  // styles: [
  //   `
  //     .custom-outline {
  //       --mdc-outlined-text-field-outline-color: red;
  //       --mdc-outlined-text-field-outline-width: 12px;
  //       --mdc-outlined-text-field-outline-focus-color: blue;
  //       --mdc-outlined-text-field-outline-hover-color: darkred;

  //       .mdc-notched-outline {
  //         border-radius: 8px !important;
  //       }

  //       .mdc-text-field--focused .mdc-notched-outline {
  //         --mdc-outlined-text-field-outline-width: 3px;
  //       }
  //     }
  //   `,
  // ],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements ControlValueAccessor {
  label = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('ticker');
  prefixIcon = input<string | null>(null);
  suffixIcon = input<string | null>(null);
  hint = input<string | null>(null);
  error = input<string | null>(null);
  value = model<string>('');
  disabled = input(false, { transform: booleanAttribute });

  rateLimitMethod = input<'throttle' | 'debounce'>('debounce');
  rateLimitTime = input(300); // Default: 300ms
  // output to emit value changes
  valueChanged = output<string>();
  // internal Subject to handle value changes with rate limiting
  private valueChanges$ = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  blurred = output<void>();

  constructor() {
    effect(() => {
      const methods = this.rateLimitMethod();
      const time = this.rateLimitTime();
      this.valueChanges$
        .pipe(
          methods === 'throttle' ? throttleTime(time) : debounceTime(time),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((value) => {
          this.onChange(value);
          this.valueChanged.emit(value);
        });
    });
  }

  // Form control methods
  private onChange = (value: string) => {};
  private onTouched = () => {};
  // internal state
  private _isDisabled = signal(false);

  isDiabled = computed(() => this.disabled() || this._isDisabled());

  writeValue(value: string): void {
    this.value.set(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value.set(inputElement.value);
    this.onChange(inputElement.value);
    this.valueChanges$.next(inputElement.value);
  }
  onBlur(): void {
    this.onTouched();
    this.blurred.emit();
  }
}
