import { Routes } from '@angular/router';
import { ProductTableComponent } from '../landing/components/product-table/product-table.component';
import { ProductFormComponent } from '../landing/components/product-form/product-form.component';
import { HomeComponent } from '../landing/components/home/home.component';

/**
 * Rutas de la aplicacion.
 */
export const routes: Routes = [
    /**
     * Ruta raiz.
     */
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    /**
     * Inicio.
     */
    { path: 'home', component: HomeComponent },
    /**
     * Lista de productos.
     */
    { path: 'product-list', component: ProductTableComponent },
    /**
     * Nuevo producto.
     */
    { path: 'product', component: ProductFormComponent },
    /**
     * Editar producto.
     */
    { path: 'product/:edit', component: ProductFormComponent },
];