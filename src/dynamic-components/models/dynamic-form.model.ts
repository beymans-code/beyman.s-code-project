/**
 * Configuracion base de un control.
 */
export interface BaseControl {
  /**
   * Tipo de control.
   */
  type: ControlType;
  /**
   * Clave del abstract control.
   */
  key: string;
  /**
   * Label.
   */
  label: string;
  /**
   * Columnas grids.
   */
  col: columnConfig;
  /**
   * Valor por defecto.
   */
  defaultValue?: any;
  /**
   * Texto inferior.
   */
  hint?: string;
  /**
   * Oculta el campo.
   */
  hidden?: boolean;
  /**
   * Tooltip.
   */
  tooltip?: string;
  /**
   * Clases scss.
   */
  classes?: string;
  /**
   * Apariencia del input.
   */
  appearance?: 'fill' | 'outline';
  /**
   * Tipo de input: 'text' | 'number' | 'currency' | 'textarea' | 'date'.
   */
  _input_type?: InputType;
  /**
   * Placeholder.
   */
  _input_placeholder?: string;
  /**
   * Validador disabled.
   */
  _validator_disabled?: boolean;
  /**
   * Validador requerido.
   */
  _validator_required?: boolean;
  /**
   * Validador min length.
   */
  _validator_minLength?: number;
  /**
   * Validador max length.
   */
  _validator_maxLength?: number;

  /**
   * Habilitar un campo dependiendo del valor de otro.
   */
  _enable_if?: EnableIf,
}

/**
 * Habilitar un campo dependiendo del valor de otro.
 */
export interface EnableIf {
  /**
   * Clave del campo con el que se quiere validar.
   */
  key: string,
}

/**
 * Columnas grids.
 */
export interface columnConfig {
  /**
   * PTamano en pntallas xxl.
   */
  xxl?: number;
  /**
   * Tamano en pantallas xl.
   */
  xl?: number;
  /**
   * Tamano en pantallas lg.
   */
  lg?: number;
  /**
   * Tamano en pantallas md.
   */
  md?: number;
  /**
   * Tamano en pantallas sm.
   */
  sm?: number;
  /**
   * Tamano en pantallas xs.
   */
  xs?: number;
}

/**
 *  Tipo de abstractControl.
 */
export type ControlType =
  | 'Input'
  | 'Select'
  | 'CheckBox'
  | 'Switch'
  | 'Divider';

/**
 * Tipo de input.
 */
export type InputType = 'text' | 'number' | 'currency' | 'textarea' | 'date' | 'email';