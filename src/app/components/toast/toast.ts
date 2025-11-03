import { Component, EventEmitter, Output, input, effect } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
    	<div class="toast" [class.show]="show()">
    		<div class="toast-header">
    			<strong class="me-auto">Success</strong>
    			<button type="button" class="btn-close" (click)="hide()"></button>
    		</div>
    		<div class="toast-body">{{ message() }}</div>
    	</div>
    </div>`,
})
export class Toast {
  show = input(false);
  message = input('');
  duration = input(5000);

  @Output() showChange = new EventEmitter<boolean>();

  constructor() {
    effect(() => {
      if (this.show()) {
        setTimeout(() => this.hide(), this.duration());
      }
    });
  }

  hide(): void {
    this.showChange.emit(false);
  }
}
