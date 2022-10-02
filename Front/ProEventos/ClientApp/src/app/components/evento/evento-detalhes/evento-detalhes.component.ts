import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.component.html',
  styleUrls: ['./evento-detalhes.component.scss']
})
export class EventoDetalhesComponent {

  public form: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      local: ['', [Validators.required]],
      data: ['',[Validators.required]],
      qtdPessoas: ['',[Validators.required, Validators.max(120000)]],
      telefone: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      imagemURL: ['',[Validators.required]],
    })
  }

  public resetForm(): void {
    this.form.reset();
  }

}
