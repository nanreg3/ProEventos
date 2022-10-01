import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class EventoService {

  baseURL = 'http://localhost:5000/api/Evento'

  constructor(private http: HttpClient) {
  }
  public getEventos() {
    return this.http.get(this.baseURL)
  }
}
