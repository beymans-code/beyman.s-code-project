import { Component } from '@angular/core';
import { MaterialPaletteGeneratorService } from '../../../dynamic-components/services/material-palette-generator.service';
import { defaultImage } from '../../../assets/image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public homeCoverImage: string = '';

  constructor(public materialPaletteGeneratorService: MaterialPaletteGeneratorService) {
    this.homeCoverImage = defaultImage;
  }

  /**
   * Se ejecuta al renderizar el componente.
   */
  public ngAfterViewInit(): void {
    const imageBackground1 = document.getElementById('imageBackground1');
    if (imageBackground1) {
      const url = `url(${this.homeCoverImage.split(' ').join('')})`;
      imageBackground1.style.backgroundImage = url;
    }
  }

  public setImage(event: any) {
    const imgFile: any = document.getElementById('imageBackground');
    const imgFile1: any = document.getElementById('imageBackground1');

    const files = event.srcElement.files;
    if (imgFile && FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = async () => {
        imgFile.src = fr.result;

        const url = `url(${JSON.stringify(fr.result).split(' ').join('')})`;
        imgFile1.style.backgroundImage = url;

        imgFile1.src = fr.result;
        this.generatePalette();
      };
      fr.readAsDataURL(files[0]);
    }
  }

  public async generatePalette() {
    this.materialPaletteGeneratorService.getImagePalette();
  }

}
