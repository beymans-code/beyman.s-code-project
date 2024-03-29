import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { MaterialPaletteGeneratorService } from '../../../dynamic-components/services/material-palette-generator.service';
import { defaultImage } from '../../../assets/image';
import { DynamicDividerComponent } from '../../../dynamic-components/components/dynamic-divider/dynamic-divider.component';
import { DynamicCardComponent } from '../../../dynamic-components/components/dynamic-card/dynamic-card.component';
import { TypeIcon } from '../../../dynamic-components/models/dynamic-icon.models';
import { DynamicIconComponent } from '../../../dynamic-components/components/dynamic-icon/dynamic-icon.component';


export interface SkillCategory {
  name: string,
  list: Skill[],
  imageUrl: string;
}

export interface Skill {
  typeIcon: TypeIcon
  icon: string,
  description: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DynamicDividerComponent, DynamicCardComponent, DynamicIconComponent],
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

  public skills: SkillCategory[] = [
    {
      name: 'Lenguajes de programación',
      imageUrl: 'https://img.freepik.com/vector-gratis/ilustracion-concepto-gestion-oficina_114360-8811.jpg?t=st=1711667038~exp=1711670638~hmac=7bddfd0fae82a50c84c9e0e006184c627003fb8ed27b58ddcd94c24ce350410e&w=1380',
      list: [
        { typeIcon: 'devicon', icon: 'devicon-java-plain-wordmark', description: 'Java' },
        { typeIcon: 'fa-brands', icon: 'fa-js', description: 'Javascript' },
        { typeIcon: 'fi', icon: 'fi-brands-typescript', description: 'TypeScript' },
        { typeIcon: 'devicon', icon: 'devicon-php-plain', description: 'Php' },
        { typeIcon: 'devicon', icon: 'devicon-azuresqldatabase-plain', description: 'SQL' },
      ]
    },
    {
      name: 'Lenguajes diseño y marcado',
      imageUrl: 'https://img.freepik.com/vector-gratis/ilustracion-concepto-programador_114360-2217.jpg?t=st=1711667109~exp=1711670709~hmac=0372ba4a09407474c23454d36200c6ea3ee5bea78c7588621c7c0c2f91ab4f0f&w=826',
      list: [
        { typeIcon: 'fa-brands', icon: 'fa-html5', description: 'Html' },
        { typeIcon: 'fa-brands', icon: 'fa-css3-alt', description: 'Css' },
        { typeIcon: 'devicon', icon: 'devicon-sass-original', description: 'Sass' },
      ]
    },
    {
      name: 'Frameworks de desarrollo',
      imageUrl: 'https://img.freepik.com/vector-gratis/ilustracion-programacion-computadora-plana-organica_23-2148955255.jpg?t=st=1711667158~exp=1711670758~hmac=66b5acd21b0f2c3863b89ca403cf73ccaadedd0f824780b845717f038a9c696f&w=826',
      list: [
        { typeIcon: 'fa-brands', icon: 'fa-angular', description: 'Angular', },
        { typeIcon: 'iconify', icon: 'iconify-jest', description: 'Jest', },
        { typeIcon: 'iconify', icon: 'iconify-jasmine', description: 'Jasmine', },
        { typeIcon: 'iconify', icon: 'iconify-nx', description: 'Nx monorepo', },
        { typeIcon: 'devicon', icon: 'devicon-ngrx-plain', description: 'NgRx', },
        { typeIcon: 'devicon', icon: 'devicon-rxjs-plain', description: 'RxJs', },
        { typeIcon: 'iconify', icon: 'iconify-ionic', description: 'Ionic', },
        { typeIcon: 'iconify', icon: 'iconify-electron', description: 'Electron', },
        { typeIcon: 'devicon', icon: 'devicon-wordpress-plain', description: 'WordPress', },
        { typeIcon: 'devicon', icon: 'devicon-firebase-plain', description: 'Firebase' },
      ]
    },
    {
      name: 'Frameworks de diseño',
      imageUrl: 'https://img.freepik.com/vector-gratis/ilustracion-concepto-control-versiones_114360-1566.jpg?t=st=1711667182~exp=1711670782~hmac=ce94653122e315248df1135565cc965e23905292a94f6a74044314bdcedfef8b&w=826',
      list: [
        { typeIcon: 'iconify', icon: 'iconify-material-design', description: 'Material Design' },
        { typeIcon: 'devicon', icon: 'devicon-bootstrap-plain', description: 'Bootstrap', },
        { typeIcon: 'devicon', icon: 'devicon-angularmaterial-plain', description: 'Angular material', },
        { typeIcon: 'devicon', icon: 'devicon-materializecss-plain', description: 'Materialize', },
      ]
    },
    {
      name: 'Utilidades',
      imageUrl: 'https://img.freepik.com/vector-gratis/ilustracion-concepto-mecanografia-codigo_114360-3866.jpg?t=st=1711667148~exp=1711670748~hmac=99c4667786439b2db141c63311d6b8fb626ceaf8c4af999d090a634e5e6088f9&w=1380',
      list: [
        { typeIcon: 'devicon', icon: 'devicon-git-plain', description: 'Git' },
        { typeIcon: 'devicon', icon: 'devicon-illustrator-plain', description: 'Adobe illustrator' }
      ]
    },
  ]

  @ViewChildren('item') items!: QueryList<ElementRef>;

  constructor(public materialPaletteGeneratorService: MaterialPaletteGeneratorService) {
    this.homeCoverImage = defaultImage;
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: any) {
  //   this.checkVisibility();
  // }


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

  // checkVisibility() {
    // if (!this.items) return;

    // this.items.forEach((item, i) => {
    //   const element = item.nativeElement;
    //   const rect = element.getBoundingClientRect();
    //   const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    //   if (rect.top >= 0 && rect.bottom <= viewportHeight) {
    //     console.log(`El elemento ${i} está completamente visible en el viewport.`);
    //   }
    // });
  // }

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
    this.materialPaletteGeneratorService.getImagePalette(document.body.classList.contains('dark'));
  }

}
