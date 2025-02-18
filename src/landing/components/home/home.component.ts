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
  observer: IntersectionObserver | null = null;

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

  @ViewChildren('image') images!: QueryList<ElementRef>;
  @ViewChildren('mobileSection') mobileSections!: QueryList<ElementRef>;

  constructor(public materialPaletteGeneratorService: MaterialPaletteGeneratorService, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {
    this.homeCoverImage = defaultImage;
    this.visible = 0
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 992;
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      const nuevaVista = window.innerWidth < 992;
      if (nuevaVista !== this.isMobile) {
        this.isMobile = nuevaVista;
      }
      this.observarElementos();
    }
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
      this.observarElementos();
    }
  }

  crearObservador() {

    const opciones = {
      root: null,
      threshold: Array.from({ length: 101 }, (_, i) => i / 100) // Umbrales de 0% a 100% en pasos de 1%
    };
  
    let elementoVisible: ElementRef | null = null;
    this.observer = new IntersectionObserver((entradas) => {
      requestAnimationFrame(() => {
        const targetArray = this.isMobile ? this.mobileSections : this.images;
        const elementos = targetArray.toArray(); // Almacenar una sola vez
  
        entradas.forEach((entrada) => {
          const index = elementos.findIndex(el => el.nativeElement === entrada.target);
          if (index > 0) {
            const elementoAnterior = elementos[index - 1];
            const opacidad = 1 - entrada.intersectionRatio; // Opacidad inversa
            const desplazamientoMaximo = elementoAnterior.nativeElement.offsetHeight;
  
            // elementoAnterior.nativeElement.style.opacity = opacidad.toFixed(2);
            // elementoAnterior.nativeElement.style.transform =
            //   entrada.intersectionRatio === 0
            //     ? 'translateY(0) scale(1)'
            //     : `translateY(${desplazamientoMaximo * entrada.intersectionRatio}px) scale(${1 - 0.03 * (1 - entrada.intersectionRatio)})`;
            // elementoAnterior.nativeElement.style.opacity = opacidad.toFixed(2);
            // elementoAnterior.nativeElement.style.transform =
            //   entrada.intersectionRatio === 0
            //     ? 'scale(1)'
            //     : `scale(${(1 - entrada.intersectionRatio).toFixed(4)})`;
            elementoAnterior.nativeElement.style.opacity = opacidad.toFixed(2);
          }
  
          if (entrada.intersectionRatio > 0.5) {
            elementoVisible = elementos[index];
            this.visible = index;
          } else if (elementoVisible?.nativeElement === entrada.target && entrada.intersectionRatio <= 0.5) {
            this.visible = elementos.length - 1;
          }
  
          if (index === elementos.length - 1) {
            const ultimoElemento = elementos[index];
            const opacidad = (1 - entrada.intersectionRatio).toFixed(2);
            ultimoElemento.nativeElement.style.opacity = opacidad;
            ultimoElemento.nativeElement.style.transform = 'translateY(0)';
          }
        });
      });
    }, opciones);
  }

  observarElementos() {
    if (this.observer) {
      this.observer.disconnect();
    }

    const elementos = this.isMobile ? this.mobileSections : this.images;
    elementos.forEach((elemento) => {
      this.observer?.observe(elemento.nativeElement);
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
