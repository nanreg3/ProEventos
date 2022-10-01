using ProEventos.Domain.Models;
using System.Threading.Tasks;

namespace ProEventos.Persistence.PalestrantePersist
{
    public interface IPalestrantePersiste
    {
        Task<Palestrante> GetAllPalestanteByIdAsync(int PalestranteId, bool IncludeEventos);
        Task<Palestrante[]> GetAllPalestrantesAsync(bool IncludeEventos);
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string Nome, bool IncludeEventos);
    }
}
