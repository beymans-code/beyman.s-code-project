import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Botones dinamicos.
 */
@Component({
  selector: 'app-dynamic-button',
  standalone: true,
  imports: [],
  inputs: [
    { name: 'label' },
    { name: 'icon' },
    { name: 'disabled' },
  ],
  outputs: ['action'],
  templateUrl: './dynamic-button.component.html',
  styleUrl: './dynamic-button.component.scss'
})
export class DynamicButtonComponent {
  /**
   * Label del boton.
   */
  @Input()
  public label: string | undefined;

  /**
   * Icono del boton se usan los iconos Material Icons de Google.
   */
  @Input()
  public icon: string | undefined;

  /**
   * Deshabilita el boton.
   */
  @Input()
  public disabled: boolean;

  /**
   * Tipo de boton 'fab' | 'default'.
   */
  @Input()
  public type: 'fab' | 'default' | undefined;

  /**
   * Color del boton 'dark' | 'light'.
   */
  @Input()
  public color: 'dark' | 'light' | undefined;

  /**
   * Accion al dar click en el boton.
   */
  @Output()
  public action: EventEmitter<null> = new EventEmitter<null>();

  /**
   * Crea una instancia de la clase.
   */
  constructor() {
    this.disabled = false;
  }
}
