import { Component, TemplateRef, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.carregarEventos();
  }

  public eventos: any = [];
  public eventosFiltrados: any = [];
  public widthImg: number = 120;
  public marginImg: number = 2;
  public isCollapsed = true;
  public _filtro: string = '';
  public modalRef?: BsModalRef;
  public eventoId = 0;

  public get filtro(): string {
    return this._filtro;
  }
  public set filtro(value: string) {
    this._filtro = value;
    this.eventosFiltrados = (this._filtro ? this.Filtrar(this._filtro) : this.eventos)
  }
  public Filtrar(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  public carregarEventos() {
    this.eventoService.getEventos().subscribe(
      x => {
        this.spinner.show();
        this.eventos = x;
        this.eventosFiltrados = this.eventos;
      },
      e => {
        console.error(e);
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Eventos.', 'Erro!');
      },
      () => this.spinner.hide()
    )
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.eventoService.delete(this.eventoId).subscribe(
      (x: any) => {
        console.log(x);
        if (x.message === 'Deletado com sucesso!') {
          this.toastr.success('Evento deletado com sucesso.', 'Deletado!');
          this.spinner.hide();
          this.carregarEventos();
        }
      },
      (e) => {
        console.error(e);
        this.toastr.error('Erro ao deletar Evento', 'Erro!');
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  decline(): void {
    this.modalRef.hide();
    this.toastr.info('Evento NÃO deletado.', 'Cancelado!');
  }

  detalhesEvento(id: number): void {
    this.router.navigate([`eventos/detalhes/${id}`])
  }

}
