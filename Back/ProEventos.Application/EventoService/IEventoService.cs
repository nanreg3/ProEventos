using ProEventos.Application.Dtos;
using System.Threading.Tasks;

namespace ProEventos.Application.EventoService
{
    public interface IEventoService
    {
        Task<EventoDto> AddEvento(EventoDto model);
        Task<EventoDto> UpdateEvento(int eventoId, EventoDto model);
        Task<bool> DeleteEvento(int eventoId);

        Task<EventoDto[]> GetAllEventosAsync(bool IncludePalestrantes = false);
        Task<EventoDto[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrantes = false);
        Task<EventoDto> GetEventoByIdAsync(int EventoId, bool IncludePalestrantes = false);
    }
}
