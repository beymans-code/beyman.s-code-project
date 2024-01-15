import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BaseControl, EnableIf } from '../../models/dynamic-form.model';
import { NgClass } from '@angular/common';
import { DynamicControlTextComponent } from '../dynamic-control-text/dynamic-control-text.component';
import { clone } from '../../services/storage';

/**
 * Formularios dinamicos.
 */
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  inputs: [
    {
      name: 'baseControls',
      required: true,
    },
    {
      name: 'autoComplete',
    },
  ],
  outputs: [
    'formValue'
  ],
  imports: [ReactiveFormsModule, NgClass, DynamicControlTextComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements AfterViewInit, OnDestroy {

  /**
   * Configuracion inicial.
   */
  @Input()
  public set baseControls(value: BaseControl[] | undefined) {
    const newControlConfig = value || [];
    this._baseControls =
      newControlConfig.map((item) =>
        clone({
          ...item,
        })
      ) || [];
    if (!this.firstLoad) {
      this._createForm(this._baseControls || []);
    } else {
      this._updateForm(this._baseControls || []);
    }
    this.firstLoad = true;
  }

  /**
   * Valida si se habilita el autocompletado del navegador en el formulario.
   */
  @Input()
  public autoComplete: boolean;

  /**
   * Retorna el valor del formulario.
   */
  @Output()
  public formValue: EventEmitter<object> = new EventEmitter<object>();

  /**
   * Carga inicial.
   */
  public firstLoad: boolean;

  /**
   * Modo del formulario.
   */
  public mode: 'create' | 'edit' | undefined;

  /**
   * Form group.
   */
  public formGroup = new FormGroup({});

  /**
   * Configuracion inicial (variable local).
   */
  public _baseControls!: BaseControl[];

  /**
   * Estado del formulario.
   */
  public valid: boolean;

  /**
   * Elimina las suscripciones.
   */
  private destroyFormSubscriptions$: Subject<void>;

  /**
   * Crea una instancia de la clase.
   */
  constructor() {
    this.destroyFormSubscriptions$ = new Subject();
    this.firstLoad = false;
    this.autoComplete = false;
    this.valid = false;
  }

  /**
   * Se ejecuta al renderizar el componente.
   */
  public ngAfterViewInit(): void {
    this.valid = this.formGroup.valid;
  }

  /**
   * Se ejecuta al destruir el componente.
   */
  public ngOnDestroy(): void {
    this.destroyFormSubscriptions$.next();
    this.destroyFormSubscriptions$.complete();
  }

  /**
   * Convierte un abstract control en Form control.
   * @param _abstractControl - AbstractControl.
   * @returns FormControl.
   */
  public abstractControlToFormControl(
    _abstractControl: AbstractControl | null
  ): FormControl {
    return _abstractControl as FormControl;
  }

  /**
   * Reinicia el formulario.
   */
  public reset() {
    this.formGroup.reset();
    this.mode = undefined;
  }

  /**
   * Crea el formulario.
   * @param controls - Controles.
   */
  private _createForm(controls: BaseControl[]) {
    if (controls)
      try {
        this.destroyFormSubscriptions$.next();
        this.formGroup = new FormGroup({});
        controls.map((control) => {
          if (control && control.key) {
            this._addControl(control);
          }
        });
        this._listenFormChanges();
      } catch (error) {
        console.error(error);
      }
  }

  /**
   * Actualiza el formulario ya renderizado.
   * @param controls - Controles.
   */
  private _updateForm(controls: BaseControl[]) {
    const oldKeys = Object.keys(this.formGroup.value);
    this.destroyFormSubscriptions$.next();
    this.destroyFormSubscriptions$.complete();

    oldKeys.forEach((key) => {
      if (!controls.find((control) => control.key?.trim() === key?.trim())) {
        this.formGroup.removeControl(key);
      }
    });

    controls.forEach((control) => {
      if (oldKeys.find((_oldKey) => _oldKey?.trim() === control.key?.trim())) {
        this._updateControl(control);
      }
    });

    controls.forEach((control) => {
      if (!oldKeys.find((_oldKey) => _oldKey?.trim() === control.key?.trim())) {
        this._addControl(control);
      }
    });

    this.formGroup.updateValueAndValidity();
    this._listenFormChanges();
  }

  /**
   * Agrega un control al formulario.
   * @param control - Control.
   */
  private _addControl(control: BaseControl) {
    const formControl = this._controlValidators(control);
    if (control?._validator_disabled) {
      formControl?.disable();
    } else if (formControl?.disabled) {
      formControl?.enable();
    }
    this.formGroup.addControl(control.key.trim(), formControl);
    this.formGroup.updateValueAndValidity();
  }

  /**
   * Actualiza un control existente en el formulario.
   * @param control - Control.
   */
  private _updateControl(control: BaseControl) {
    const validators = this._getValidators(control);
    this.formGroup.get(control.key?.trim() || '')?.setValidators(validators);
    this.formGroup.get(control.key?.trim() || '')?.updateValueAndValidity();

    if (control._validator_disabled) {
      this.formGroup.get(control.key?.trim() || '')?.disable();
    } else if (this.formGroup.get(control.key?.trim() || '')?.disabled) {
      this.formGroup.get(control.key?.trim() || '')?.enable();
    }
  }

  /**
   * Obtiene el control.
   * @param item - Configuracion del control.
   * @returns Control.
   */
  private _controlValidators(item: BaseControl) {
    const validators = this._getValidators(item);

    let _defaultValue: any = item?.defaultValue || null;
    if (item.type === 'CheckBox' || item.type === 'Switch') {
      _defaultValue = item?.defaultValue ? true : false;
    }

    const _control = new FormControl(
      {
        value: _defaultValue,
        disabled: item?._validator_disabled || false,
      },
      Validators.compose(validators)
    );
    return _control;
  }

  /**
   * Obtiene los validadores de un control.
   * @param item - Configuracion del control.
   * @returns Validators.
   */
  private _getValidators(item: BaseControl): any[] {
    let validators: any[] = [];
    if (!item?._validator_disabled) {
      if (item?._validator_required) {
        validators.push(Validators.required);
      }

      if (item?._input_type === 'email') validators.push(Validators.email);

      if (item._validator_minLength)
        validators.push(Validators.minLength(item._validator_minLength));

      if (item._validator_maxLength)
        validators.push(Validators.maxLength(item._validator_maxLength));
    }

    return validators;
  }

  /**
   * Escucha los cambios del formulario.
   */
  private _listenFormChanges() {
    this.destroyFormSubscriptions$ = new Subject();
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroyFormSubscriptions$))
      .subscribe((value) => {
        this.formValue.emit(value);
        this.valid = this.formGroup.valid;
      });

    this._baseControls.forEach((control, index) => {
      if (control._enable_if?.key) {
        this.formGroup.get(control._enable_if.key)?.valueChanges
          .pipe(takeUntil(this.destroyFormSubscriptions$))
          .subscribe((value) => {
            if (control._enable_if)
              this._valideEnableIf(index, value, control.key)
          });
      }
    })
  }

  /**
   * Valida si un control se habilita o no dependiendo de la configuracion inicial.
   * @param index - Indice del control.
   * @param value - Valor del control con el que se valida.
   * @param key - Clave del control a habilitar o deshabilitar.
   */
  private _valideEnableIf(index: number, value: any, key: string) {
    this.toggleControl(index, key, !value)
  }

  /**
   * Habilita o deshabilita un control.
   * @param index - Indice del control.
   * @param key Clave del control a habilitar o deshabilitar.
   * @param disabled 
   */
  public toggleControl(index: number, key: string, disabled: boolean) {
    disabled ? this.formGroup.get(key)?.disable() : this.formGroup.get(key)?.enable();
    this._baseControls[index] = {
      ...this._baseControls[index],
      _validator_disabled: disabled,
    }
  }
}
