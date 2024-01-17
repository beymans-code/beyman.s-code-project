import { Injectable } from '@angular/core';

import {
  Hct,
  applyTheme,
  themeFromImage,
  hexFromArgb,
  MaterialDynamicColors,
  Scheme,
  Theme,
} from '@material/material-color-utilities';
import { addItem } from './storage';

export interface ApplicationTheme {
  id: string;
  primary: string;
  secundary: string;
  tertiary: string;
  warn: string;
}

/**
 *INTERFAZ DE COLORES RGB.
 */
export interface RGB {
  /**
   *BLUE.
   */
  b: number;
  /**
   *GREEN.
   */
  g: number;
  /**
   *RED.
   */
  r: number;
}
export let _background: string = 'red';

@Injectable({
  providedIn: 'root',
})
export class MaterialPaletteGeneratorService {
  /**
   * Variables de temas.
   */
  public themeCssVariables: string[] = [
    'primary',
    'secondary',
    'accent',
    'warn',
    '--primary-contrast-900',
    '--secundary-contrast-900',
    '--accent-contrast-900',
    '--warn-contrast-900',
  ];

  constructor() { }

  /**
   * Envia la paleta de colores a nuestra hoja de estilos.
   * @param _palette - Array.
   * @param prefix - String.
   * @param contrast - Boolean.
   * @param opacity - Boolean.
   */
  public setCssVars(
    _palette: any[],
    prefix: string,
    contrast: boolean,
    opacity?: boolean
  ): void {
    const root: any = document.querySelector(':root');
    let darkness = 0;
    _palette.forEach((_palette, index) => {
      if (index == 0) {
        darkness = 50;
      } else if (index == 1) {
        darkness = 100;
      } else {
        darkness += 100;
      }
      if (!opacity) {
        root?.style.setProperty(
          `--${prefix}-${contrast ? 'contrast-' + darkness : darkness}`,
          contrast ? _palette.contrast : _palette.color
        );
      } else {
        root?.style.setProperty(
          `--${prefix}-opacity-${darkness}`,
          contrast ? _palette.contrast : _palette.color
        );
      }
    });
  }

  /**
   * Envia la variable css.
   * @param name - String.
   * @param color - String.
   */
  public setCssVar(name: string, color: string): void {
    const root: any = document.querySelector(':root');
    root?.style.setProperty(`--${name}`, color);
  }

  public getImagePalette(dark?: boolean) {
    const imgFile: any = document.getElementById('imageBackground');

    let systemDark = typeof dark === 'boolean' ? dark : window.matchMedia('(prefers-color-scheme: dark)').matches;
    // let systemDark = false;

    getImageBase64(imgFile?.src || '')
      .then(() => {
        themeFromImage(imgFile).then((theme: Theme) => {
          addItem('theme', theme);
          this.changeTheme(theme, systemDark)
        });
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }

  public changeTheme(theme: Theme, systemDark: boolean) {
    if (systemDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    const scheme: Scheme = systemDark
      ? theme.schemes.dark
      : theme.schemes.light;

    const primary = hexFromArgb(scheme.primary);
    const onPrimary = hexFromArgb(scheme.onPrimary);
    const primaryContainer = hexFromArgb(scheme.primaryContainer);
    const onPrimaryContainer = hexFromArgb(scheme.onPrimaryContainer);
    const secondary = hexFromArgb(scheme.secondary);
    const onSecondary = hexFromArgb(scheme.onSecondary);
    const secondaryContainer = hexFromArgb(scheme.secondaryContainer);
    const onSecondaryContainer = hexFromArgb(scheme.onSecondaryContainer);
    const tertiary = hexFromArgb(scheme.tertiary);
    const onTertiary = hexFromArgb(scheme.onTertiary);
    const tertiaryContainer = hexFromArgb(scheme.tertiaryContainer);
    const onTertiaryContainer = hexFromArgb(scheme.onTertiaryContainer);
    const error = hexFromArgb(scheme.error);
    const onError = hexFromArgb(scheme.onError);
    const errorContainer = hexFromArgb(scheme.errorContainer);
    const onErrorContainer = hexFromArgb(scheme.onErrorContainer);
    const background = hexFromArgb(scheme.background);
    const onBackground = hexFromArgb(scheme.onBackground);
    const surface = hexFromArgb(scheme.surface);
    const onSurface = hexFromArgb(scheme.onSurface);
    const surfaceVariant = hexFromArgb(scheme.surfaceVariant);
    const onSurfaceVariant = hexFromArgb(scheme.onSurfaceVariant);
    const outline = hexFromArgb(scheme.outline);
    const outlineVariant = hexFromArgb(scheme.outlineVariant);
    const shadow = hexFromArgb(scheme.shadow);
    const scrim = hexFromArgb(scheme.scrim);
    const inverseSurface = hexFromArgb(scheme.inverseSurface);
    const inverseOnSurface = hexFromArgb(scheme.inverseOnSurface);
    const inversePrimary = hexFromArgb(scheme.inversePrimary);

    this.setCssVar('primary', primary);
    this.setCssVar('onPrimary', onPrimary);
    this.setCssVar('primaryContainer', primaryContainer);
    this.setCssVar('onPrimaryContainer', onPrimaryContainer);
    this.setCssVar('secondary', secondary);
    this.setCssVar('onSecondary', onSecondary);
    this.setCssVar('secondaryContainer', secondaryContainer);
    this.setCssVar('onSecondaryContainer', onSecondaryContainer);
    this.setCssVar('tertiary', tertiary);
    this.setCssVar('onTertiary', onTertiary);
    this.setCssVar('tertiaryContainer', tertiaryContainer);
    this.setCssVar('onTertiaryContainer', onTertiaryContainer);
    this.setCssVar('error', error);
    this.setCssVar('onError', onError);
    this.setCssVar('errorContainer', errorContainer);
    this.setCssVar('onErrorContainer', onErrorContainer);
    this.setCssVar('background', background);
    this.setCssVar('onBackground', onBackground);
    this.setCssVar('surface', surface);
    this.setCssVar('onSurface', onSurface);
    this.setCssVar('surfaceVariant', surfaceVariant);
    this.setCssVar('onSurfaceVariant', onSurfaceVariant);
    this.setCssVar('outline', outline);
    this.setCssVar('outlineVariant', outlineVariant);
    this.setCssVar('shadow', shadow);
    this.setCssVar('scrim', scrim);
    this.setCssVar('inverseSurface', inverseSurface);
    this.setCssVar('inverseOnSurface', inverseOnSurface);
    this.setCssVar('inversePrimary', inversePrimary);

    _background = background;

    this.generatePalette(
      primary,
      this.themeCssVariables[0],
      10,
      onPrimary,
      systemDark
    );
    this.generatePalette(
      tertiary,
      this.themeCssVariables[2],
      10,
      onTertiary,
      systemDark
    );
    this.generatePalette(
      secondary,
      this.themeCssVariables[1],
      10,
      onSecondary,
      systemDark
    );
    this.generatePalette(
      error,
      this.themeCssVariables[3],
      10,
      onError,
      systemDark
    );

    // Apply the theme to the body by updating custom properties for material tokens
    // applyTheme(theme, { target: document.body, dark: systemDark });
  }


  public aumentarOpacidad1(colorBase: string, cantidad: number) {
    // Verificar si el color tiene formato hexadecimal (#RRGGBB)
    if (!/^#[0-9A-Fa-f]{6}$/.test(colorBase)) {
      throw new Error('El color debe estar en formato hexadecimal (#RRGGBB)');
    }

    // Convertir el color hexadecimal a valores RGB
    const r = parseInt(colorBase.slice(1, 3), 16);
    const g = parseInt(colorBase.slice(3, 5), 16);
    const b = parseInt(colorBase.slice(5, 7), 16);

    // Calcular decremento para cada componente
    const decrementoR = r / cantidad;
    const decrementoG = g / cantidad;
    const decrementoB = b / cantidad;

    // Generar colores más oscuros y vivos
    const coloresOscurosVivos = [];

    for (let i = 0; i < cantidad; i++) {
      const nuevoR = Math.max(0, Math.round(r - i * decrementoR));
      const nuevoG = Math.max(0, Math.round(g - i * decrementoG));
      const nuevoB = Math.max(0, Math.round(b - i * decrementoB));
      const nuevoColor = this.rgbToHex(nuevoR, nuevoG, nuevoB);
      coloresOscurosVivos.push(nuevoColor);
    }

    return coloresOscurosVivos;
  }

  public aumentarOpacidad(colorBase: string, cantidad: number) {
    // Verificar si el color tiene formato hexadecimal (#RRGGBB)
    if (!/^#[0-9A-Fa-f]{6}$/.test(colorBase)) {
      throw new Error('El color debe estar en formato hexadecimal (#RRGGBB)');
    }

    // Convertir el color hexadecimal a valores RGB
    const r = parseInt(colorBase.slice(1, 3), 16);
    const g = parseInt(colorBase.slice(3, 5), 16);
    const b = parseInt(colorBase.slice(5, 7), 16);

    // Calcular incremento para cada componente
    const incrementoR = (255 - r) / cantidad;
    const incrementoG = (255 - g) / cantidad;
    const incrementoB = (255 - b) / cantidad;

    // Generar colores que se acercan al blanco
    const coloresBlancos = [];

    for (let i = 0; i < cantidad; i++) {
      const nuevoR = Math.min(255, Math.round(r + i * incrementoR));
      const nuevoG = Math.min(255, Math.round(g + i * incrementoG));
      const nuevoB = Math.min(255, Math.round(b + i * incrementoB));
      const nuevoColor = this.rgbToHex(nuevoR, nuevoG, nuevoB);

      coloresBlancos.push(nuevoColor);
    }

    return coloresBlancos;
  }

  public rgbToHex(r: any, g: any, b: any) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }

  /**
   * Generar array de colores.
   * @param colorStart - String.
   * @param prefix - String.
   * @param colorCount - Number.
   * @returns Array.
   */
  public generatePalette(
    colorStart: string,
    prefix: string,
    colorCount: number,
    contrastStart: string,
    dark: boolean
  ) {
    // Obtener el array de colores con diferentes opacidades
    let coloresOpacos = [];
    let contrastes = [];

    // colorStart = this.aumentarSaturacion(colorStart, 0);
    coloresOpacos = this.aumentarOpacidad(colorStart, colorCount).reverse();
    contrastes = this.aumentarOpacidad1(contrastStart, colorCount).reverse();

    const palette = [];

    for (let i = 0; i < colorCount; i++) {
      const contrast = this.contrast(coloresOpacos[i]);
      palette.push({
        color: coloresOpacos[i],
        // contrast: contrastes[i],
        contrast: contrast,
      });
    }

    const palette_opacity = this.generateOpacityPalette(colorStart);

    this.setCssVars(palette, prefix, false);
    this.setCssVars(palette, prefix, true);
    this.setCssVars(palette_opacity, prefix, false, true);
    return palette;
  }

  /**
   * Valida si el color blanco o negro contrasta con el color que se envia.
   * @param colorHex - String.
   * @param threshold - Number.
   * @returns String.
   */
  public contrast(
    colorHex: string | undefined,
    threshold: number = 128
  ): '#000' | '#fff' {
    if (colorHex === undefined) {
      return '#000';
    }
    const rgb: RGB | undefined = this.hexToRgb(colorHex);
    if (rgb === undefined) {
      return '#000';
    }
    return this.rgbToYIQ(rgb) >= threshold ? '#000' : '#fff';
  }

  // Función para subir la saturación de un color en formato hexadecimal
  public aumentarSaturacion(color: string, incremento: any) {
    // Verificar si el color tiene formato hexadecimal (#RRGGBB)
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      throw new Error('El color debe estar en formato hexadecimal (#RRGGBB)');
    }

    // Convertir el color hexadecimal a valores RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Convertir RGB a HSL
    const hsl = this.rgbToHsl(r, g, b);

    // Aumentar la saturación
    hsl[1] = Math.min(100, hsl[1] + incremento);

    // Convertir HSL a RGB
    const nuevoColorRgb = this.hslToRgb(hsl[0], hsl[1], hsl[2]);
    const nuevoColorHex = this.rgbToHex(
      nuevoColorRgb[0],
      nuevoColorRgb[1],
      nuevoColorRgb[2]
    );

    return nuevoColorHex;
  }

  // Función para convertir RGB a HSL
  public rgbToHsl(r: any, g: any, b: any) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // grayscale
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  }

  // Función para convertir HSL a RGB
  public hslToRgb(h: any, s: any, l: any) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: any, q: any, t: any) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  /**
   * Convirete un color rgb a hex.
   * @param hex - Color hexadecimal.
   * @returns Any.
   */
  public hexToRgb(hex: string): RGB | undefined {
    if (!hex || hex === undefined || hex === '') {
      return undefined;
    }
    const result: RegExpExecArray | null =
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : undefined;
  }

  /**
   * Valida el contraste del color con el modelo YIQ.
   * @param rgb - Color en formato RGB.
   * @returns Number.
   */
  public rgbToYIQ(rgb: RGB): number {
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  /**
   * Genera una paleta de colores con opacidad.
   * @param color - String.
   * @returns Array.
   */
  public generateOpacityPalette(color: string) {
    const colorRgb = this.convertToRGB(color);
    const palette = [];
    let max = 10;
    for (let i = 0; i < 10; i++) {
      const res =
        `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, ` +
        `${i == 0 ? '' : '0.'}` +
        `${i == 9 ? '04' : i == 8 ? '09' : max--})`;
      const contrast = this.contrast(res);
      palette.push({
        color: res,
        contrast: contrast,
      });
    }
    return palette;
  }

  /**
   * Convierte el color hex a rgb.
   * @param hex - Color hexadecimal.
   * @returns Array.
   */
  private convertToRGB(hex: string) {    
    const color = [];
    color[0] = parseInt(this.trim(hex).substring(0, 2), 16);
    color[1] = parseInt(this.trim(hex).substring(2, 4), 16);
    color[2] = parseInt(this.trim(hex).substring(4, 6), 16);
    return color;
  }

  /**
   * Elimina el # del hex.
   * @param c - Color.
   * @returns Any.
   */
  private trim(c: any) {
    return c.charAt(0) == '#' ? c.substring(1, 7) : c;
  }

  /**
   * Retorna el mismo color enviado con mas luminosidad.
   * @param hex - Color hexadecimal.
   * @param lum - Luminosidad.
   * @returns String.
   */
  public colorLuminance(hex: string, lum: number) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    let color = '#',
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      color += ('00' + c).substr(c.length);
    }
    return color;
  }
}

const getImageBase64 = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    // Cuando la imagen se carga correctamente
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0, image.width, image.height);
        const base64String = canvas.toDataURL(); // La imagen se convierte a base64
        resolve(base64String);
      } else {
        reject(new Error('No se pudo obtener el contexto del canvas.'));
      }
    };

    // Si hay un error al cargar la imagen
    image.onerror = () => {
      reject(new Error('No se pudo cargar la imagen.'));
    };

    image.crossOrigin = 'anonymous';

    // Inicia la descarga de la imagen
    image.src = imageUrl;
  });
};