import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.scss',
})
export class ConfirmationModal {
  @Input({ transform: (value: boolean) => signal(value) }) show = signal(false);
  @Input({ transform: (value: string) => signal(value) }) title = signal('Confirm');
  @Input({ transform: (value: string) => signal(value) }) message = signal('Are you sure?');
  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
