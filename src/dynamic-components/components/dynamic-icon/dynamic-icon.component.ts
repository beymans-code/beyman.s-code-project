import { Component, Input, OnInit } from '@angular/core';
import { TypeIcon } from '../../models/dynamic-icon.models';

@Component({
  selector: 'dynamic-icon',
  standalone: true,
  imports: [],
  inputs: [
    { name: 'icon', required: true },
    { name: 'type', required: true },
    { name: 'class', required: false },
    { name: 'size', required: false },
    { name: '_style', required: false },

  ],
  templateUrl: './dynamic-icon.component.html',
  styleUrl: './dynamic-icon.component.scss'
})
export class DynamicIconComponent implements OnInit {

  @Input()
  public icon: string;

  @Input()
  public type: TypeIcon;

  @Input()
  public size: number | undefined;

  @Input()
  public class: string | undefined;

  @Input()
  public _style: string | undefined;

  public styles: string;

  constructor() {
    this.type = 'material-icons';
    this.icon = '';
    this.styles = ``;
  }


  public ngOnInit(): void {
    this.styles = `font-size: ${this.size || 25}px; width: ${this.size || 25}px; height: ${this.size || 25}px; ${this._style || ''}`;
  }

}
