import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    this.getEventos();

  }

  public eventos: any = [];
  public eventosFiltrados: any = [];
  public widthImg: number = 120;
  public marginImg: number = 2;
  public isCollapsed = true;
  public _filtro: string = '';
  public modalRef?: BsModalRef;

  public get filtro(): string {
    return this._filtro;
  }
  public set filtro(value: string){
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

  public getEventos() {
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.showSuccess();
  }

  decline(): void {
    this.modalRef.hide();
    this.toastr.info('Evento NÃO deletado.', 'Cancelado!');
  }

  showSuccess() {
    this.toastr.success('Evento deletado com sucesso.', 'Deletado!');
  }

}
