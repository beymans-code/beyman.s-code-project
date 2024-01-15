import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { defaultImage } from '../assets/image';
import { MaterialPaletteGeneratorService } from '../dynamic-components/services/material-palette-generator.service';
import { DynamicButtonComponent } from '../dynamic-components/components/dynamic-button/dynamic-button.component';

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
    setTimeout(() => {
      this.materialPaletteGeneratorService.getImagePalette();
    }, 1000);
  }

  public toggleDark() {
    this.materialPaletteGeneratorService.getImagePalette();
  }
}
