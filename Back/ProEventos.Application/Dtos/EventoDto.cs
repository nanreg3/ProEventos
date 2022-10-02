using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string Data { get; set; }

        [Required(ErrorMessage = "O {0} é obrigatório")
        , MinLength(3, ErrorMessage =" O {0} deve conter no mínimo 3 carateres")
        , MaxLength(50, ErrorMessage = " O {0} deve conter no máximo 50 carateres")]
        public string Tema { get; set; }

        [Range(1,120000, ErrorMessage ="A qtd não pode ser menor de 1 e maior de 120.000 pessoas")]
        public int? QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$"
        , ErrorMessage ="Não é um tipo de imagem válida (gif, jpg, jpeg, bmp, png.")]
        public string ImagemURL { get; set; }

        [Phone(ErrorMessage ="Insira um numero de {0} válido.")]
        public string Telefone { get; set; }

        [Display(Name = "e-mail")]
        [EmailAddress(ErrorMessage = "Utilize um {0} válido")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}
