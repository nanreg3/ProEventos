using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProEventos.Domain.Models
{
    public class Evento
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public DateTime? Data { get; set; }
        public string Tema { get; set; }
        public int? QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public IEnumerable<Lote> Lotes { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; }
        public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }

        //DataAnnotations:

        //[ForeignKey("NOME_DA_OUTRA_TABELA")]
        //public int IdPalestrantes { get; set; }

        //propriedade que nao será criada no banco.
        //[NotMapped]
        //public int qdtDeDias { get; set; }

        //Tamanho de caracter da coluna no banco:
        //[MaxLength(50)]
    }
}
