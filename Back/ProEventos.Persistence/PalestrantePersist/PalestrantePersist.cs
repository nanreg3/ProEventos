using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Persistence.PalestrantePersist
{
    public class PalestrantePersiste : IPalestrantePersiste
    {
        private readonly ProEventosContext _context;
        public PalestrantePersiste(ProEventosContext context)
        {
            _context = context;
        }
        public async Task<Palestrante> GetAllPalestanteByIdAsync(int PalestranteId, bool IncludeEventos = false)
        {
            IQueryable<Palestrante> palestrantes = _context.Palestrantes
                .Include(p => p.RedesSociais);
            if (IncludeEventos)
            {
                palestrantes = palestrantes
                    .Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }
            palestrantes = palestrantes.Where(p => p.Id == PalestranteId);
            return await palestrantes.FirstOrDefaultAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool IncludeEventos = false)
        {
            IQueryable<Palestrante> palestrantes = _context.Palestrantes
                .Include(p => p.RedesSociais);
            if (IncludeEventos)
            {
                palestrantes = palestrantes
                    .Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }
            palestrantes = palestrantes
                .OrderBy(p => p.Id);
            return await palestrantes.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string Nome, bool IncludeEventos = false)
        {
            IQueryable<Palestrante> palestrantes = _context.Palestrantes
                .Include(p => p.RedesSociais);
            if (IncludeEventos)
            {
                palestrantes = palestrantes
                    .Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }
            palestrantes = palestrantes
                .OrderBy(p => p.Id)
                .Where(p => p.Nome.ToLower()
                .Contains(Nome.ToLower()));
            return await palestrantes.ToArrayAsync();
        }
    }
}
