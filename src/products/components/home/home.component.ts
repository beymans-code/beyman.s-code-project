import { Component } from '@angular/core';
import { MaterialPaletteGeneratorService } from '../../../dynamic-components/services/material-palette-generator.service';
import { defaultImage } from '../../../assets/image';
import { DynamicDividerComponent } from '../../../dynamic-components/components/dynamic-divider/dynamic-divider.component';
import { DynamicCardComponent } from '../../../dynamic-components/components/dynamic-card/dynamic-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DynamicDividerComponent, DynamicCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public homeCoverImage: string = '';

  public p = `Un desarrollador Front End con
  <b>6 años de experiencia</b> en la industria
  creando aplicaciones <b>interactivas</b>,
  con una <b>experiencia de usuario excepcional</b>
  y <b>código de calidad</b>.`

  public h1 = 'Hola, Soy Beyman.';

  public skills = [
    {
      name: 'Lenguajes de programación y marcado.',
      list: [
        'Java.',
        'Javascript.',
        'TypeScript',
        'Php.',
        'Html.',
        'Css (Scss, Sass).',
        'SQL.',
      ]
    },
    {
      name: 'Frameworks y librerías.',
      list: [
        'Angular.',
        'Jest.',
        'Nx monorepo.',
        'NgRx(Redux).',
        'RxJs.',
        'Ionic.',
        'Electron.',
        'Angular material.',
        'Bootstrap.',
        'Materialize.',
        'WordPress.',
        'Firebase.'
      ]
    },
    {
      name: 'Utilidades.',
      list: [
        'Git.',
        'Adobe illustrator.'
      ]
    },
  ]

  constructor(public materialPaletteGeneratorService: MaterialPaletteGeneratorService) {
    this.homeCoverImage = defaultImage;
  }

  /**
   * Se ejecuta al renderizar el componente.
   */
  public ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      const imageBackground1 = document.getElementById('imageBackground1');
      if (imageBackground1) {
        const url = `url(${this.homeCoverImage.split(' ').join('')})`;
        imageBackground1.style.backgroundImage = url;
      }
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
    this.materialPaletteGeneratorService.getImagePalette(!document.body.classList.contains('dark'));
  }

}
