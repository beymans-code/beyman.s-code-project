import { Component } from '@angular/core';
import { ControlBase } from '../dynamic-control-base/control-base';
import { ReactiveFormsModule } from '@angular/forms';


/**
 * Control de texto.
 */
@Component({
  selector: 'app-dynamic-control-text',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-control-text.component.html',
  styleUrl: './dynamic-control-text.component.scss',
})
export class DynamicControlTextComponent extends ControlBase {
  /**
   * Crea una instancia de la clase.
   */
  constructor() {
    super();
  }
}
