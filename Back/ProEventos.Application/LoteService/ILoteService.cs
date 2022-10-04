using ProEventos.Application.Dtos;
using System.Threading.Tasks;

namespace ProEventos.Application.EventoService
{
    public interface ILoteService
    {
        Task<LoteDto> SaveLotes(int eventoId, LoteDto[] models);
        Task<bool> DeleteLote(int eventoId, int loteId);

        Task<LoteDto[]> GetLoteByEventoIdAsync(int eventoId);
        Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteId);
    }
}
