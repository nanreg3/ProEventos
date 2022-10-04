using System.Threading.Tasks;
using ProEventos.Domain.Models;

namespace ProEventos.Persistence.EventoPersist
{
    public interface ILotePersist
    {
        /// <summary>
        /// Metodo que retorna 1 array de lotes
        /// </summary>
        /// <param name="eventoId">Codigo chave da tabela Evento</param>
        /// <returns>Array de Lotes</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);

        /// <summary>
        /// Metodo que retorna apenas 1 lote
        /// </summary>
        /// <param name="eventoId">Codigo chave da tabela Evento</param>
        /// <param name="id">Codigo chave da tabela Lote</param>
        /// <returns>1 Lote</returns>
        Task<Lote> GetLotesByIdsAsync(int eventoId, int id);

    }
}
