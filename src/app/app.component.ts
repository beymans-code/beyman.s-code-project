import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { defaultImage } from '../assets/image';
import { MaterialPaletteGeneratorService } from '../dynamic-components/services/material-palette-generator.service';
import { DynamicButtonComponent } from '../dynamic-components/components/dynamic-button/dynamic-button.component';
import { getItem } from '../dynamic-components/services/storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DynamicButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'beyman.s-code-project';


  constructor(public materialPaletteGeneratorService: MaterialPaletteGeneratorService) { }

  /**
   * Se ejecuta al renderizar el componente.
   */
  public ngAfterViewInit(): void {
    // setTimeout(() => {
      if (typeof document !== 'undefined') {
        this.materialPaletteGeneratorService.getImagePalette();
      }
    // }, 1000);
  }

  public toggleDark() {
    const theme = getItem('theme');
    this.materialPaletteGeneratorService.changeTheme(theme, !document.body.classList.contains('dark'))
  }
}
