import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent {

  @Input() titulo: string;
  @Input() iconClass: string;
  @Input() subtitulo = 'desde 2011';
  @Input() botaoListar = false;

  constructor(private router : Router) { }

  public listar() {
    this.router.navigate([`${this.titulo.toLocaleLowerCase()}/lista`]);
  }

}
