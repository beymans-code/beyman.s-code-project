import { Component, Input } from '@angular/core';
export type TextAlign = 'left' | 'right' | 'center';
/**
 * Componente de cards dinamicos.
 */
@Component({
  selector: 'dynamic-card',
  standalone: true,
  imports: [],
  inputs: [
    {
      name: 'title',
    },
    {
      name: 'hideActions',
    },
    {
      name: 'titleAlign',
    },
    {
      name: 'contentAlign',
    },
    {
      name: 'class',
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
 * Titulo del card.
 */
  @Input()
  public titleAlign!: TextAlign;

  /**
  * Titulo del card.
  */
  @Input()
  public contentAlign!: TextAlign;

  /**
   * Ocultar las acciones del card.
   */
  @Input()
  public hideActions!: boolean;

    /**
   * Ocultar las acciones del card.
   */
    @Input()
    public class!: string;
}
