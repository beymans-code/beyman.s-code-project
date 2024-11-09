import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DynamicTableComponent } from '../../../dynamic-components/components/dynamic-table/dynamic-table.component';
import { TableConfig } from '../../../dynamic-components/models/dynamic-table.model';
import { ProductTableService } from '../../services/product-table.service';
import { Router } from '@angular/router';
import { addItem, getItem, removeItem } from '../../../dynamic-components/services/storage';
import { DynamicButtonComponent } from '../../../dynamic-components/components/dynamic-button/dynamic-button.component';

/**
 * Tabla de productos.
 */
@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [DynamicTableComponent, DynamicButtonComponent],
  providers: [
    ProductTableService
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {

  /**
   * Tabla.
   */
  @ViewChild('table')
  public table!: DynamicTableComponent;

  /**
   * Configuracion de la tabla.
   */
  public tableConfig: TableConfig;

  /**
   * Index a editar.
   */
  private editIndex!: string | undefined;

  /**
   * Crea una instancia de la clase.
   * @param _productTableService - Servicio de configuracion de la tabla.
   * @param router - Router angular.
   * @param cdRef - Detector de cambios.
   */
  constructor(private _productTableService: ProductTableService, public router: Router, private cdRef: ChangeDetectorRef
  ) {
    this.editIndex = getItem('edit');
    this.tableConfig = {
      ...this._productTableService.tableConfig,
      rows: getItem('rows') ? getItem('rows') : this._productTableService.tableConfig.rows
    };
  }

  /**
   * Se ejecuta al renderizar el componente.
   */
  public ngAfterViewInit(): void {
    if (getItem('product')) {
      this.addData(getItem('product'), this.editIndex !== null);
    }
    removeItem('product')
    removeItem('edit')
    this.cdRef.detectChanges();
  }

  public reset() {
    localStorage.clear();
    window.location.reload();
  }

  /**
   * Editar la fila.
   * @param row - Fila.
   */
  public editRow(row: any) {
    addItem('edit', row.index)
    addItem('product', row)
    this.router.navigate(['/product', 'edit',]);
  }

  /**
   * Agregar / editar una fila.
   * @param row - Fila.
   * @param edit - Editar.
   */
  public addData(row: object, edit: boolean) {
    if (edit && typeof this.editIndex !== 'undefined') {
      this.table.editRow(row, Number(this.editIndex))
    } else {
      this.table.addRows([
        row
      ])
    }
  }

  /**
   * Guarda el cambio de la data en el storage.
   * @param rows - Filas.
   */
  public dataChange(rows: object[]) {
    addItem('rows', rows)
  }
}
