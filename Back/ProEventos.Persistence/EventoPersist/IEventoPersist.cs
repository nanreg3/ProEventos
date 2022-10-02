using System.Threading.Tasks;
using ProEventos.Domain.Models;

namespace ProEventos.Persistence.EventoPersist
{
    public interface IEventoPersist
    {
        Task<Evento[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrantes = false);
        Task<Evento[]> GetAllEventosAsync(bool IncludePalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);

    }
}
