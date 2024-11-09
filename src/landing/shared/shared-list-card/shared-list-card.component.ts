import { Component, ElementRef, HostListener, Input, QueryList, ViewChildren } from '@angular/core';
import { DynamicDividerComponent } from '../../../dynamic-components/components/dynamic-divider/dynamic-divider.component';
import { DynamicCardComponent } from '../../../dynamic-components/components/dynamic-card/dynamic-card.component';
import { DynamicIconComponent } from '../../../dynamic-components/components/dynamic-icon/dynamic-icon.component';
import { DynamicButtonComponent } from '../../../dynamic-components/components/dynamic-button/dynamic-button.component';
import { ListCard } from '../models/shared.model';


@Component({
  selector: 'shared-list-card',
  standalone: true,
  imports: [DynamicDividerComponent, DynamicCardComponent, DynamicIconComponent, DynamicButtonComponent],
  inputs: [
    {
      name: 'skills',
      required: true,
    }
  ],
  templateUrl: './shared-list-card.component.html',
  styleUrl: './shared-list-card.component.scss'
})
export class SharedListCardComponent {

  public visible: number;

  /**
   * Icono del boton se usan los iconos Material Icons de Google.
   */
  @Input()
  public skills: ListCard[] = []


  @ViewChildren('item') items!: QueryList<ElementRef>;

  constructor() {
    this.visible = -1;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.checkVisibility();
  }

  goTo(url: string) {
    window.open(url, '_blank', 'noreferrer noopener');
  }

  checkVisibility() {
    if (!this.items) return;
    this.items.forEach((item, i) => {
      const element = item.nativeElement;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top >= 0 && rect.bottom <= viewportHeight + 100) {
        console.log(`El elemento ${i} está completamente visible en el viewport.`);
        this.visible = i;
      }
    });
  }

}
