import { Evento } from "./Evento";

export interface Lote {
  id: number;
  nome: string;
  preco: number;
  inicio?: Date;
  fim?: Date;
  quantidade: number;
  eventoId: number;
  evento: Evento;
}
