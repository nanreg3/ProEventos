import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';

import { LoteService } from './services/lote.service';
import { EventoService } from './services/evento.service';

import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { EventoComponent } from './components/evento/evento.component';
import { PalestranteComponent } from './components/palestrante/palestrante.component';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UserComponent } from './components/user/user.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { EventoDetalhesComponent } from './components/evento/evento-detalhes/evento-detalhes.component';
import { EventoListaComponent } from './components/evento/evento-lista/evento-lista.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EventoComponent,
    DashboardComponent,
    ContatosComponent,
    PerfilComponent,
    PalestranteComponent,
    TituloComponent,
    DateTimeFormatPipe,
    EventoDetalhesComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'user', component: UserComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'registration', component: RegistrationComponent },
        ]
      },
      { path: 'user/perfil', component: PerfilComponent },
      { path: 'eventos', redirectTo: 'eventos/lista' },
      {
        path: 'eventos', component: EventoComponent,
        children: [
          { path: 'detalhes/:id', component: EventoDetalhesComponent },
          { path: 'detalhes', component: EventoDetalhesComponent },
          { path: 'lista', component: EventoListaComponent },
        ]
      },
      { path: 'palestrantes', component: PalestranteComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'contatos', component: ContatosComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ]),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    EventoService,
    LoteService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
