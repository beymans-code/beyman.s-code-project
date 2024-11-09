import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MaterialPaletteGeneratorService } from '../../../dynamic-components/services/material-palette-generator.service';
import { defaultImage } from '../../../assets/image';
import { DynamicDividerComponent } from '../../../dynamic-components/components/dynamic-divider/dynamic-divider.component';
import { DynamicCardComponent } from '../../../dynamic-components/components/dynamic-card/dynamic-card.component';
import { DynamicIconComponent } from '../../../dynamic-components/components/dynamic-icon/dynamic-icon.component';
import { DynamicButtonComponent } from '../../../dynamic-components/components/dynamic-button/dynamic-button.component';
import { Item, ListCard } from '../../shared/models/shared.model';
import { SharedListCardComponent } from '../../shared/shared-list-card/shared-list-card.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface HomeCol {
  id: string;
  class: string;
  listCard?: ListCard[];
  list?: Item[];
}

export interface HomeItem {
  title: string;
  subtitle?: string;
  cols: HomeCol[]
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DynamicDividerComponent, DynamicCardComponent, DynamicIconComponent, DynamicButtonComponent, SharedListCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public homeCoverImage: string = '';
  public p = `Desarrollador Front End con
  <b>6 años de experiencia</b> creando aplicaciones <b>interactivas</b>  que combinan una <b>experiencia de usuario excepcional</b> con <b>código de alta calidad</b>.`
  public h1 = '¡Hola! Soy Beyman.';
  visible: number;
  isMobile: boolean = false;
  opacity = '0'

  public skills: ListCard[] = [
    {
      name: 'Frameworks y Bibliotecas',
      description: 'Trabajé en proyectos utilizando diversos frameworks y bibliotecas, con un enfoque principal en Angular.',
      imageUrl: 'assets/images/home/1-min.jpg',
      thanksTo: 'https://www.freepik.es/vector-gratis/ilustracion-concepto-abstracto-marcos-multiplataforma-herramienta-construccion-programacion-marco-desarrollo-software-estructura-multiplataforma-interfaz-usuario-aplicacion-proceso-codificacion_10780411.htm#query=framework&position=1&from_view=author&uuid=fdfa28c3-760e-454b-bb98-955893b2b3fc',
      thanksToName: 'Créditos de la imagen @vectorjuice',
      list: [
        { typeIcon: 'fa-brands', icon: 'fa-angular', description: 'Angular', },
        // { typeIcon: 'iconify', icon: 'iconify-nx', description: 'Nx monorepo', },
        { typeIcon: 'iconify', icon: 'iconify-jasmine', description: 'Jasmine', },
        { typeIcon: 'iconify', icon: 'iconify-jest', description: 'Jest', },
        { typeIcon: 'devicon', icon: 'devicon-ngrx-plain', description: 'NgRx', },
        // { typeIcon: 'devicon', icon: 'devicon-rxjs-plain', description: 'RxJs', },
        { typeIcon: 'iconify', icon: 'iconify-ionic', description: 'Ionic', },
        { typeIcon: 'iconify', icon: 'iconify-electron', description: 'Electron', },
        { typeIcon: 'devicon', icon: 'devicon-nodejs-plain-wordmark', description: 'Node.js' },
        { typeIcon: 'devicon', icon: 'devicon-react-original', description: 'React', }
      ]
    },
    {
      name: 'Lenguajes de programación',
      description: 'He desarrollado proyectos empleando varios lenguajes de programación, enfocandome en JavaScript, TypeScript y Java.',
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
      name: 'Diseño y maquetación',
      description: 'He diseñado interfaces centradas en experiencia de usuario, empleando HTML, CSS, Material Design de Google, entre otras herramientas.',
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
        // { typeIcon: 'devicon', icon: 'devicon-materializecss-plain', description: 'Materialize', },
      ]
    },
    {
      name: 'Herramientas y utilidades',
      description: 'Además de dominar herramientas más variadas como Git, WordPress o Adobe Illustrator.',
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

  public homeItems: HomeItem[] = [
    {
      title: 'Conocimientos',
      cols: [
        {
          id: 'skills',
          class: 'col-md-12 col-lg-6 mx-auto p-0',
          listCard: this.skills,
        }
      ]
    }

  ]

  @ViewChildren('item') items!: QueryList<ElementRef>;
  @ViewChildren('image') images!: QueryList<ElementRef>;

  constructor(public materialPaletteGeneratorService: MaterialPaletteGeneratorService, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {
    this.homeCoverImage = defaultImage;
    this.visible = 0
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window !== undefined) this.isMobile = (window.innerWidth <= 991)
    if (!this.isMobile) this.checkVisibility();
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
    if (isPlatformBrowser(this.platformId)) {
      this.crearObservador();
    } else {
      console.warn('Este código solo se ejecuta en el navegador.');
    }
  }

  crearObservador() {
    const opciones = {
      root: null,
      threshold: Array.from({ length: 11 }, (_, i) => i / 10) // Umbrales de 0% a 100%
    };

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada, i) => {
        // Encuentra el índice del elemento actual en la lista de imágenes
        const index = this.images.toArray().findIndex(el => el.nativeElement === entrada.target);

        // Si hay un elemento anterior, aplica la opacidad calculada
        if (index > 0) {
          const elementoAnterior = this.images.toArray()[index - 1];
          const opacidad = (1 - entrada.intersectionRatio).toFixed(1); // Calcula opacidad invertida
          elementoAnterior.nativeElement.style.opacity = opacidad === '0.1'? '0' : opacidad;
          elementoAnterior.nativeElement.style.transform = `scale(0.9${opacidad.replace('0.', '')})`;
        }

        // if (i === 0) {
        //   const elemento = this.images.find(el => el.nativeElement === entrada.target);
        //   if (elemento) {
        //     elemento.nativeElement.style.opacity = entrada.intersectionRatio;
        //   }
        // }
      });
    }, opciones);

    // Observa cada elemento en la lista
    this.images.forEach((elemento) => {
      observador.observe(elemento.nativeElement);
    });


  }

  checkVisibility() {
    if (!this.items) return;
    this.items.forEach((item, i) => {
      const element = item.nativeElement;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top >= 0 && rect.bottom <= viewportHeight + 100 && this.visible !== i) {
        console.log(`El elemento ${i} está completamente visible en el viewport.`);
        this.visible = i;
      }
    });
    // const _rect = this.items.get(this.visible)?.nativeElement?.getBoundingClientRect();
    // const position = `${_rect.top.toFixed(0)}`
    // const _position = position.includes('-') ? position.replace('-', '') : `${position}`
    // this.opacity = _position.split('')[0]
    // // if (!_position.includes('-')) {
    //   console.log('Visible ', this.visible, ' ', this.opacity);
    // // }
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
