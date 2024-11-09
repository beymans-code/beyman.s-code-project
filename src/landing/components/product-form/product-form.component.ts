import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../../dynamic-components/components/dynamic-form/dynamic-form.component';
import { BaseControl } from '../../../dynamic-components/models/dynamic-form.model';
import { ProductFormService } from '../../services/product-form.service';
import { DynamicButtonComponent } from '../../../dynamic-components/components/dynamic-button/dynamic-button.component';
import { DynamicCardComponent } from '../../../dynamic-components/components/dynamic-card/dynamic-card.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subject, delay, takeUntil } from 'rxjs';
import { addItem, getItem, removeItem } from '../../../dynamic-components/services/storage';

/**
 * Formulario de productos.
 */
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [DynamicFormComponent, DynamicButtonComponent, DynamicCardComponent],
  providers: [ProductFormService],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements AfterViewInit, OnDestroy {
  /**
   * Formulario de creacion de productos.
   */
  @ViewChild('formCreate')
  public formCreate!: DynamicFormComponent;

  /**
   * Controles del formulario.
   */
  public controls: BaseControl[];

  /**
   * Destructor de suscripciones.
   */
  public destroy$: Subject<undefined> = new Subject()

  /**
   * Crea una instancia de la clase.
   * @param _productFormService - Servicio de formulario de productos.
   * @param route - Ruts activs angular.
   * @param router - Router angular.
   * @param cdRef - Detector de cambios.
   */
  constructor(
    private _productFormService: ProductFormService,
    private route: ActivatedRoute,
    public router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.controls = this._productFormService.controls;
  }

  /**
   * Se ejecuta al renderizar el componente.
   */
  public ngAfterViewInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (getItem('product') && (params['edit'] || getItem('edit'))) {
          this.formCreate.mode = 'edit';
          this.formCreate.toggleControl(0, 'id', true);
        } else if (!getItem('product') && (params['edit'] || getItem('edit'))) {
          this.router.navigate(['/product']);
        }
      });

    if (getItem('product'))
      this.formCreate.formGroup.patchValue(getItem('product'));
    this.cdRef.detectChanges();
  }

  /**
   * Se ejecuta al destruir el componente.
   */
  public ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  /**
   * Agregar / editar producto.
   */
  public addData() {
    const value = this.formCreate.formGroup.value;
    addItem('product', value);
    this.router.navigate(['/product-list',]);
    this.formCreate.reset();
  }

  /**
   * Regresar.
   */
  public back() {
    removeItem('product');
    removeItem('edit');
    this.router.navigate(['/product-list'])
  }
}
