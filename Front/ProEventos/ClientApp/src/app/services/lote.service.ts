import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Lote } from '../models/Lote';

@Injectable()

export class LoteService {

  baseURL = 'http://localhost:5000/api/lotes'

  constructor(private http: HttpClient) {
  }

  public getLotes(eventoId: number) : Observable<Lote[]>{
    return this.http.get<Lote[]>(`${this.baseURL}/${eventoId}`).pipe(take(1));
  }

  public  saveLotes(eventoId: number, lote: Lote[]): Observable<Lote[]> {
    return this.http.put<Lote[]>(`${this.baseURL}/${eventoId}`, lote).pipe(take(1));
  }

  public deleteLote(eventoId: number, loteId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${eventoId}/${loteId}`).pipe(take(1));
  }

}
