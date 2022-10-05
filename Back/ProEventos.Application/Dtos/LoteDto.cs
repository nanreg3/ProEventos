using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class LoteDto
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        [Display(Name = "Preço")]
        [Range(10, 10000, ErrorMessage = "O {0} não pode ser menor de R$ 10 e maior de R$ 10.000")]
        public decimal Preco { get; set; }

        [Required(ErrorMessage = "Formato requirido: DD/MM/YYYY hh:mm")]
        public string Inicio { get; set; }

        [Required(ErrorMessage = "Formato requirido: DD/MM/YYYY hh:mm")]
        public string Fim { get; set; }

        [Range(1, 100, ErrorMessage = "A {0} não pode ser menor de 1 e maior de 100")]
        public int? Quantidade { get; set; }
        public int EventoId { get; set; }
        public EventoDto Evento { get; set; }

    }
}
