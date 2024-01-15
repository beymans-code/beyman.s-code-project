import { Component, Input } from '@angular/core';

/**
 * Componente de cards dinamicos.
 */
@Component({
  selector: 'app-dynamic-card',
  standalone: true,
  imports: [],
  inputs: [
    {
      name: 'title',
    },
    {
      name: 'hideActions',
    }
  ],
  templateUrl: './dynamic-card.component.html',
  styleUrl: './dynamic-card.component.scss'
})
export class DynamicCardComponent {
  /**
   * Titulo del card.
   */
  @Input()
  public title!: string;

  /**
   * Ocultar las acciones del card.
   */
  @Input()
  public hideActions!: boolean;
}
