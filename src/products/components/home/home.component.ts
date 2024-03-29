import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { MaterialPaletteGeneratorService } from '../../../dynamic-components/services/material-palette-generator.service';
import { defaultImage } from '../../../assets/image';
import { DynamicDividerComponent } from '../../../dynamic-components/components/dynamic-divider/dynamic-divider.component';
import { DynamicCardComponent } from '../../../dynamic-components/components/dynamic-card/dynamic-card.component';
import { TypeIcon } from '../../../dynamic-components/models/dynamic-icon.models';
import { DynamicIconComponent } from '../../../dynamic-components/components/dynamic-icon/dynamic-icon.component';
import { DynamicButtonComponent } from '../../../dynamic-components/components/dynamic-button/dynamic-button.component';

export interface SkillCategory {
  name: string,
  list: Skill[],
  imageUrl: string;
  thanksTo?: string;
  thanksToName?: string;
}

export interface Skill {
  typeIcon: TypeIcon
  icon: string,
  description: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DynamicDividerComponent, DynamicCardComponent, DynamicIconComponent, DynamicButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public homeCoverImage: string = '';
  public p = `Desarrollador Front End con
  <b>6 años de experiencia</b> creando aplicaciones <b>interactivas</b>  que combinan una <b>experiencia de usuario excepcional</b> con <b>código de alta calidad</b>.`
  public h1 = 'Hola, Soy Beyman.';
  visible: number;


  public skills: SkillCategory[] = [
    {
      name: 'Lenguajes de programación',
      imageUrl: 'assets/images/home/0-min.jpg',
      thanksTo: 'https://www.freepik.es/vector-gratis/ilustracion-concepto-abstracto-javascript_12290877.htm#query=code&position=0&from_view=author&uuid=9d37bb38-f9ab-48f7-a621-9b79bdcce398',
      thanksToName: 'Créditos de la imagen @vectorjuice',
      list: [
        { typeIcon: 'fa-brands', icon: 'fa-js', description: 'Javascript' },
        { typeIcon: 'fi', icon: 'fi-brands-typescript', description: 'TypeScript' },
        { typeIcon: 'devicon', icon: 'devicon-java-plain-wordmark', description: 'Java' },
        { typeIcon: 'devicon', icon: 'devicon-azuresqldatabase-plain', description: 'SQL' },
        { typeIcon: 'devicon', icon: 'devicon-php-plain', description: 'Php' },
      ]
    },
    {
      name: 'Frameworks y Librerías',
      imageUrl: 'assets/images/home/1-min.jpg',
      thanksTo: 'https://www.freepik.es/vector-gratis/ilustracion-concepto-abstracto-marcos-multiplataforma-herramienta-construccion-programacion-marco-desarrollo-software-estructura-multiplataforma-interfaz-usuario-aplicacion-proceso-codificacion_10780411.htm#query=framework&position=1&from_view=author&uuid=fdfa28c3-760e-454b-bb98-955893b2b3fc',
      thanksToName: 'Créditos de la imagen @vectorjuice',
      list: [
        { typeIcon: 'fa-brands', icon: 'fa-angular', description: 'Angular', },
        { typeIcon: 'iconify', icon: 'iconify-nx', description: 'Nx monorepo', },
        { typeIcon: 'iconify', icon: 'iconify-jasmine', description: 'Jasmine', },
        { typeIcon: 'iconify', icon: 'iconify-jest', description: 'Jest', },
        { typeIcon: 'devicon', icon: 'devicon-ngrx-plain', description: 'NgRx', },
        { typeIcon: 'devicon', icon: 'devicon-rxjs-plain', description: 'RxJs', },
        { typeIcon: 'iconify', icon: 'iconify-ionic', description: 'Ionic', },
        { typeIcon: 'iconify', icon: 'iconify-electron', description: 'Electron', },
        { typeIcon: 'devicon', icon: 'devicon-nodejs-plain-wordmark', description: 'Node.js' },
        { typeIcon: 'devicon', icon: 'devicon-react-original', description: 'React', }
      ]
    },
    {
      name: 'Diseño y maquetación',
      imageUrl: 'assets/images/home/2-min.jpg',
      thanksTo: 'https://www.freepik.es/vector-gratis/cursos-desarrolladores-web-estudio-programacion-informatica-diseno-web-guion-codificacion-componentes-estructura-interfaz-aprendizaje-estudiante-informatica_10783790.htm#query=web%20design&position=12&from_view=author&uuid=33149362-a705-4ace-afcb-dad5673a86d0',
      thanksToName: 'Créditos de la imagen @vectorjuice',
      list: [
        { typeIcon: 'fa-brands', icon: 'fa-html5', description: 'Html' },
        { typeIcon: 'fa-brands', icon: 'fa-css3-alt', description: 'Css' },
        { typeIcon: 'devicon', icon: 'devicon-sass-original', description: 'Sass' },
        { typeIcon: 'iconify', icon: 'iconify-material-design', description: 'Material Design' },
        { typeIcon: 'devicon', icon: 'devicon-bootstrap-plain', description: 'Bootstrap', },
        { typeIcon: 'devicon', icon: 'devicon-angularmaterial-plain', description: 'Angular material', },
        { typeIcon: 'devicon', icon: 'devicon-materializecss-plain', description: 'Materialize', },
      ]
    },
    {
      name: 'Herramientas y utilidades',
      imageUrl: 'assets/images/home/3-min.jpg',
      thanksTo: 'https://www.freepik.es/vector-gratis/ilustracion-concepto-abstracto-herramientas-marketing-impulsadas-ai_12291062.htm#query=software%20tools&position=0&from_view=author&uuid=ad2e767e-208c-4a10-b29a-5f12a74fd3c5',
      thanksToName: 'Créditos de la imagen @vectorjuice',
      list: [
        { typeIcon: 'devicon', icon: 'devicon-git-plain', description: 'Git' },
        { typeIcon: 'devicon', icon: 'devicon-illustrator-plain', description: 'Adobe illustrator' },
        { typeIcon: 'devicon', icon: 'devicon-wordpress-plain', description: 'WordPress', },
        { typeIcon: 'devicon', icon: 'devicon-firebase-plain', description: 'Firebase' },
      ]
    },
  ]

  @ViewChildren('item') items!: QueryList<ElementRef>;

  constructor(public materialPaletteGeneratorService: MaterialPaletteGeneratorService) {
    this.homeCoverImage = defaultImage;
    this.visible = 0
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.checkVisibility();
  }

  goTo(url: string) {
    console.log(url);

    window.open(url, '_blank', 'noreferrer noopener');
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
