using AutoMapper;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Dtos;
using ProEventos.Domain.Models;
using ProEventos.Persistence.EventoPersist;
using ProEventos.Persistence.GeralPersist;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Application.LoteService
{
    public class LoteService : ILoteService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ILotePersist _lotePersist;
        private readonly IMapper _mapper;
        
        //injeção das dependencias:
        public LoteService(IGeralPersist geralPersist, ILotePersist lotePersist, IMapper mapper)
        {
            _geralPersist = geralPersist;
            _lotePersist = lotePersist;
            _mapper = mapper;
        }

        //FUNCAO QUE IRA POSTAR O LOTE
        public async Task AddLotes(int eventoId, LoteDto model)
        {
            try
            {
                //MAPEAMANTO DE "LoteDto" para "Lote", pois o "_geralPersist" trabalha com o tipo "Lote"
                var lote = _mapper.Map<Lote>(model);
                lote.EventoId = eventoId;

                _geralPersist.Add<Lote>(lote);

                await _geralPersist.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //FUNCAO QUE IRA POSTAR OS LOTES
        public async Task AlterarLotes(int eventoId, LoteDto model)
        {
            try
            {
                //MAPEAMANTO DE "LoteDto" para "Lote", pois o "_geralPersist" trabalha com o tipo "Lote"
                var lote = _mapper.Map<Lote>(model);
                lote.EventoId = eventoId;

                _geralPersist.Update<Lote>(lote);

                await _geralPersist.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto[]> SaveLotes(int eventoId, LoteDto[] models)
        {
            try
            {
                var lotes = await _lotePersist.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return null;

                foreach (var model in models)
                {
                    //VERIFICAÇÃO SE EXISTE O ID DO LOTE, POIS NAO EXISTIR, IRÁ PARA O POST(ADD),
                    //SE EXISTIR, IRÁ PULAR PARA O PUT(UPDATE).
                    if(model.Id == 0)
                    {
                        //IRA CHAMAR A FUNCAO QUE IRA POSTAR OS LOTES
                        await AddLotes(eventoId, model);
                    }
                    else
                    {
                        //IRA CHAMAR A FUNCAO QUE IRA ALTERAR OS LOTES
                        await AlterarLotes(eventoId, model);
                    }
                }

                var loteRetorno = await _lotePersist.GetLotesByEventoIdAsync(eventoId);

                //MAPEAMANTO DE "Lote" para "LoteDto", pois o será RETORNADO para o controller o tipo LotoDto.
                var resultado = _mapper.Map<LoteDto[]>(loteRetorno);

                //RETORNO JA MAPEADO(CONVERTIDO) PARA LoteDto.
                return resultado;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteLote(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotePersist.GetLotesByIdsAsync(eventoId, loteId);
                if (lote == null) throw new Exception("Lote para delete nao encontrado");

                _geralPersist.Delete<Lote>(lote);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto[]> GetLotesByEventoIdAsync(int eventoId)
        {
            try
            {
                var lotes = await _lotePersist.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return null;

                //MAPEAMANTO DE "Lote" para "LoteDto", pois o será RETORNADO para o controller o tipo LotoDto.
                var resultado = _mapper.Map<LoteDto[]>(lotes);

                //RETORNO JA MAPEADO(CONVERTIDO) PARA LoteDto.
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotePersist.GetLotesByIdsAsync(eventoId, loteId);
                if (lote == null) return null;

                //MAPEAMANTO DE "Lote" para "LoteDto", pois o será RETORNADO para o controller o tipo LotoDto.
                var resultado = _mapper.Map<LoteDto>(lote);

                //RETORNO JA MAPEADO(CONVERTIDO) PARA LoteDto.
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
