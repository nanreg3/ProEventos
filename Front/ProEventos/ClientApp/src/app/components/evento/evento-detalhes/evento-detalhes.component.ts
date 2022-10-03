import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../../../models/evento';
import { EventoService } from '../../../services/evento.service';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.component.html',
  styleUrls: ['./evento-detalhes.component.scss']
})
export class EventoDetalhesComponent {

  public evento = {} as Evento;
  public form: FormGroup;
  public estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    this.validation();
    this.carregarEvento();
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (x: Evento) => {
          this.spinner.show();
          this.evento = { ...x };
          this.form.patchValue(this.evento);
        },
        (e) => {
          console.error(e);
          this.toastr.error('Erro ao carregar Evento.', 'Erro!');
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      )
    }
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      local: ['', [Validators.required]],
      data: ['', [Validators.required]],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', [Validators.required]],
    })
  }

  public resetForm(): void {
    this.form.reset();
  }

  public salverAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {

      this.evento = this.estadoSalvar === 'post'
        ? { ...this.form.value }
        : { id: this.evento.id, ...this.form.value };

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        (x) => {
          this.toastr.success('Evento salvo com Sucesso.', 'Salvo!')
        },
        (e) => {
          console.error(e);
          e.error.errors.ImagemURL[0]
            ? this.toastr.error('Tipo de imagem inválida (gif, jpg, jpeg, bmp, png.)', 'Erro!')
            : this.toastr.error('Erro ao salvar evento', 'Erro!');
        }
      ).add(() => this.spinner.hide());
    }
  }

}
