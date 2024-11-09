import { Component } from '@angular/core';
import { MaterialPaletteGeneratorService } from '../../services/material-palette-generator.service';

@Component({
  selector: 'dynamic-divider',
  standalone: true,
  imports: [],
  template: `
<div class="divider">
@for (_item of repeat; track _item;) {
  <!-- <svg viewBox="0 0 1910 211" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path [attr.fill]="color" d="M 0 0 C 485.5 0 485.5 110 971 110 L 971 110 L 971 0 L 0 0 Z" stroke-width="0"></path>
    <path [attr.fill]="color" d="M 970 110 C 1440 110 1440 0 1910 0 L 1910 0 L 1910 0 L 970 0 Z" stroke-width="0"></path>
  </svg> -->

  <svg viewBox="0 0 1910 211" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path [attr.fill]="materialPaletteGeneratorService.background || '#01010100'" d="M 0 0 C 485.5 0 485.5 110 971 110 C 1456.5 110 1456.5 0 1910 0" [attr.stroke]="materialPaletteGeneratorService.isDark ? 'white' : 'black'" stroke-width="4" fill="none"></path>

  <path fill="none" d="M 1910 0 L 1910 211 L 0 211 L 0 0 Z" ></path>
</svg>
}
</div>
  `,
  styleUrl: './dynamic-divider.component.scss'
})
export class DynamicDividerComponent {

  repeat: string[] = []
  color: string = '#01010100'

  constructor(public materialPaletteGeneratorService: MaterialPaletteGeneratorService) {
    for (let index = 0; index < 100; index++) {
      this.repeat.push('-')

    }
  }
}
