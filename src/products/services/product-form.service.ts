import { Injectable } from '@angular/core';
import { BaseControl } from '../../dynamic-components/models/dynamic-form.model';

/**
 * Servicio del formulario.
 */
@Injectable()
export class ProductFormService {

  /**
   * Configuracion inicial del formulario.
   */
  public controls: BaseControl[] = [
    {
      key: 'id',
      label: 'ID',
      type: 'Input',
      col: {
        xxl: 6,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
      },
      _input_placeholder: 'Escribe el ID',
      _validator_required: true,
    },
    {
      key: 'logo',
      label: 'Logo',
      type: 'Input',
      col: {
        xxl: 6,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
      },
      _input_placeholder: 'Máximo dos caracteres',
      _validator_required: true,
      _validator_maxLength: 2,
      _validator_minLength: 2
    },
    {
      key: 'productName',
      label: 'Nombre del producto',
      type: 'Input',
      col: {
        xxl: 6,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
      },
      _input_placeholder: 'Escribe el nombre del producto',
      _validator_required: true,
    },
    {
      key: 'description',
      label: 'Descripción',
      type: 'Input',
      col: {
        xxl: 6,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
      },
      _input_placeholder: 'Escribe la descripción',
      _validator_required: true,
    },
    {
      key: 'date1',
      label: 'Fecha de liberación',
      type: 'Input',
      col: {
        xxl: 6,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
      },
      _input_type: 'date',
      _validator_required: true,
    },
    {
      key: 'date2',
      label: 'Fecha de reestructuración',
      type: 'Input',
      col: {
        xxl: 6,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
      },
      _input_type: 'date',
      _enable_if: {
        key: 'date1',
      },
      _validator_required: true,
      _validator_disabled: true,
    },
  ];

}
