import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControl } from '../../models/dynamic-form.model';

/**
 * Clase base de los formularios dinamicos.
 */
@Component({
  selector: 'control-base',
  template: '',
  inputs: [
    { name: 'baseControl', required: true },
    { name: '_formControl', required: true },
  ],
  styles: [''],
})
export class ControlBase {
  /**
   * Configuracion del control.
   */
  @Input() public baseControl!: BaseControl;

  /**
   * Form control ReactiveFormModule.
   */
  @Input() public _formControl!: FormControl;

  /**
   * Crea una instancia de la clase.
   */
  constructor() { }
}
