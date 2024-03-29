import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output, ViewChild } from '@angular/core';
import { TableConfig } from '../../models/dynamic-table.model';
import { BaseControl } from '../../models/dynamic-form.model';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { DynamicCardComponent } from '../dynamic-card/dynamic-card.component';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';
import { snackbar } from '../../services/dynamic-snackbar';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

/**
 * Tablas dinamicas.
 */
@Component({
  selector: 'dynamic-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule, DynamicFormComponent, DynamicCardComponent, DynamicButtonComponent],
  inputs: [
    {
      name: 'tableConfig',
      required: true
    }
  ],
  outputs: [
    'edit',
    'add',
    'dataChange'
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent implements AfterViewInit {

  /**
   * Configuracion inicial de la tabla.
   */
  @Input()
  public set tableConfig(value: TableConfig | undefined) {
    if (value) {
      this._tableConfig = value
      this.filteredData = value.rows;
      if (value.options?.actions) {
        this._tableConfig.columns.push({
          key: 'actions',
          headerText: '',
          sticky: 'right'
        });
      }
    };
  }

  /**
   * Evento de edicion.
   */
  @Output()
  public edit: EventEmitter<object> = new EventEmitter<object>();

  /**
   * Evento de agregar.
   */
  @Output()
  public add: EventEmitter<object> = new EventEmitter<object>();

  /**
   * Evento de cambio en la data.
   */
  @Output()
  public dataChange: EventEmitter<object[]> = new EventEmitter<object[]>();

  /**
   * Formulario de busqueda.
   */
  @ViewChild('searchForm')
  public searchForm!: DynamicFormComponent;

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  public viewPort!: CdkVirtualScrollViewport;

  /**
   * Control de busqueda.
   */
  public controls: BaseControl[];

  /**
   * Data a renderizar.
   */
  public filteredData: object[] = [];

  /**
   * Posicion del scroll horizontal en la tabla.
   */
  public scrollLef: number | undefined;

  /**
   * Variable local de configuracion de la tabla.
   */
  public _tableConfig!: TableConfig;

  /**
   * Row actual en edicion.
   */
  public currentEditRow: number | undefined;

  /**
   * Ultimo indice del row en edicion.
   */
  public lastEditRowIndex: number | undefined;


  /**
   * Ultimo indice del row en edicion.
   */
  public headerTop: number;

  /**
 * Ultimo indice del row en edicion.
 */
  public currentThTop: number | undefined;

  /**
   * Evento de cambio de tamano en la pantalla.
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.scroll();
  }

  /**
   * Crea una instancia de la clase.
   */
  constructor() {
    this.headerTop = -10;
    this.currentThTop = undefined;
    this.controls = [
      {
        key: 'buscar',
        label: 'Buscar',
        type: 'Input',
        col: {
          xxl: 12,
          xl: 12,
          lg: 12,
          md: 12,
          sm: 12,
          xs: 12,
        },
        _input_placeholder: 'Ingresa tu busqueda',
      },
    ]
    this.scrollLef = undefined;
  }

  /**
   * Validar el for en template por indice.
   * @param index - Indice.
   * @param item - Items.
   * @returns Index.
   */
  public trackByIndex = (index: number, item: object) => index;

  /**
   * Se ejecuta al renderizar el componente.
   */
  public ngAfterViewInit(): void {
    this.scroll();
    this._setDataSource();
  }

  /**
   * Convierte un objeto en array.
   * @param obj - Objeto.
   * @returns Array.
   */
  public objectIterable(obj: any) {
    return Object.keys(obj).map((key: string) => [key, obj[key]])
  }

  /**
   * Obtiene la posicion superior de cada elemento sticky top dentro del virtual scroll viewport.
   */
  public get  headerVirtualTopPosition(): string {
    if (!this.viewPort) {
      return '-10px';
    }
    const offset = this.viewPort.getOffsetToRenderedContentStart();

    return `-${offset ? offset + 10 : 10}px`;
  }

  /**
   * Valida el scroll horizontal para agregar estilos en la tabla.
   * @param - event Evento scroll.
   */
  public scroll() {
    const event = this.viewPort?.elementRef?.nativeElement;
    if (event?.clientWidth < event?.scrollWidth) {
      const valor = event.scrollLeft > 0 ? event?.scrollLeft + event.clientWidth : event?.scrollLeft;
      const total = event?.scrollWidth;
      this.scrollLef = (valor / total) * 100;
    } else {
      this.scrollLef = undefined;
    }

    console.log(this.scrollLef);
    
  }

  /**
   * Busqueda.
   * @param value - Valor a buscar.
   */
  public search(value: any) {
    const filterValue: string = value['buscar'] || '';
    this.filteredData = this._tableConfig.rows.filter(row => {
      return this.objectIterable(row).map(column => {
        return column[1]
      }).join(' ').toString().toLowerCase().includes(filterValue.toLowerCase())
    })
  }

  /**
   * Obtiene un campo del objeto. 
   * @param row - Objeto.
   * @param key - Llave a buscar.
   * @returns Valor del campo.
   */
  public getCell(row: any, key: string) {
    return row[key];
  }

  /**
   * Eliminar un row.
   * @param index - Indice.
   */
  public delete(index: number) {
    this.closeMenu(index)
    setTimeout(() => {
      const idx = this._tableConfig.rows.findIndex(row => this.getCell(row, 'index') === index)
      this._tableConfig.rows.splice(idx, 1);
      const value = this.searchForm.formGroup?.value || '';
      this.search(value);
      this.dataChange.emit(this._tableConfig.rows)
      snackbar('delete', `Producto eliminado.`)
    }, 300);
  }

  /**
   * Iniciar la edicion.
   * @param rowIndex - Indice interno del row.
   */
  public startEditRow(rowIndex: number) {
    this.lastEditRowIndex = rowIndex;
    this.closeMenu(rowIndex)
    const idx = this._tableConfig.rows.findIndex(row => this.getCell(row, 'index') === rowIndex)
    this.edit.emit(
      this._tableConfig.rows[idx]
    )
  }

  /**
   * Cierra el menu.
   * @param rowIndex - Indice. 
   */
  closeMenu(rowIndex: number) {
    document.getElementById('buttons-container' + rowIndex)?.classList.add('close');
    setTimeout(() => {
      this.currentEditRow = undefined;
    }, 300);
  }

  /**
   * Agreg datos en la tabla.
   * @param rows - Rows.
   */
  public addRows(rows: object[]) {
    if (this._tableConfig?.rows) {
      const rowId = this._tableConfig.options?.rowId || '';
      rows.forEach(row => {
        const exist = this._tableConfig?.rows.find(_row => {
          return !this.getCell(row, 'index') &&
            rowId && this.getCell(row, rowId) &&
            this.getCell(row, rowId) === this.getCell(_row, rowId) ||

            this.getCell(row, 'index') &&
            this.getCell(row, 'index') === this.getCell(_row, 'index') &&
            rowId && this.getCell(row, rowId) &&
            this.getCell(row, rowId) === this.getCell(_row, rowId) ||

            this.getCell(row, 'index') &&
            this.getCell(row, rowId) === this.getCell(_row, rowId) &&
            !rowId
        });

        if (!exist) {
          this._tableConfig.rows = [
            ...this._tableConfig.rows,
            ...rows,
          ]
          this._setDataSource();
          snackbar('done', `Producto agregado.`)
        } else {
          snackbar('error', `Este id de producto ya existe.`)
        }
      });
    }
  }

  /**
   * Actualiza y sincroniza los datos de la tabla.
   */
  private _setDataSource() {
    const rows = this._tableConfig?.rows.map((row, index) => ({
      ...row,
      index
    }))
    this._tableConfig = {
      ...this._tableConfig,
      rows
    }
    const value = this.searchForm.formGroup?.value || '';
    this.search(value);
    this.dataChange.emit(this._tableConfig.rows)
  }

  /**
   * Edita un row.
   * @param _row - Row.
   * @param index - Index.
   */
  public editRow(_row: any, index?: number) {
    const validateIndex = typeof index == 'number' ? index : this.lastEditRowIndex;
    if (this.lastEditRowIndex !== undefined || index !== undefined) {
      const idx = this._tableConfig.rows.findIndex(row => this.getCell(row, 'index') === validateIndex);

      if (idx === -1) {
        snackbar('error', `Este producto no existe.`)
      } else {
        this._tableConfig.rows[idx] = {
          ...this._tableConfig.rows[idx],
          ..._row
        };
        snackbar('done', `Producto editado.`)
        this._setDataSource();
      }
      this.lastEditRowIndex = undefined;
    }
  }

}
