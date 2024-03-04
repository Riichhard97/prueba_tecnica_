import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Modal Title';

  @Input() width: number = 900;
  @Input() height: number = 500;

  constructor() { }

  closeModal() {
    this.isOpen = false;
  }
}
