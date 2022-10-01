import { Lote } from "./Lote";
import { RedeSocial } from "./RedeSocial";
import { Palestrante } from "./Palestrante";

export interface Evento {
  id: number;
  local: string;
  data?: Date;
  tema: string;
  qtdPessoas: number;
  imagemURL: string;
  telefone: string;
  rmail: string;
  lotes: Lote[];
  redesSociais: RedeSocial[];
  palestrantesEventos: Palestrante[];
}
