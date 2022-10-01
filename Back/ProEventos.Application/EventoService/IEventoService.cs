using ProEventos.Domain.Models;
using System.Threading.Tasks;

namespace ProEventos.Application.EventoService
{
    public interface IEventoService
    {
        Task<Evento> AddEvento(Evento model);
        Task<Evento> UpdateEvento(int eventoId, Evento model);
        Task<bool> DeleteEvento(int eventoId);

        Task<Evento[]> GetAllEventosAsync(bool IncludePalestrantes = false);
        Task<Evento[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int EventoId, bool IncludePalestrantes = false);
    }
}
