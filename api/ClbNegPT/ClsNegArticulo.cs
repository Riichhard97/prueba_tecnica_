using ClbDatPT;
using ClbModPT;
using ClbModPT.Dto;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Transactions;

namespace ClbNegPT
{
    public class ClsNegArticulo
    {
        private readonly ClsDatArticulo _articuloData;

        public ClsNegArticulo(IConfiguration configuration)
        {
            _articuloData = new ClsDatArticulo(configuration);
        }

        public async Task Insert(ClsModArticulo modArticulo)
        {
            await _articuloData.Insert(modArticulo);
        }

        public async Task<IEnumerable<ClsModArticulo>> GetAll()
        {
            return await _articuloData.GetAll();
        }

        public async Task Update(ClsModArticulo articulo)
        {
            await _articuloData.Update(articulo);
        }

        public async Task Delete(Guid articuloId)
        {
            await _articuloData.Delete(articuloId);
        }


        public async Task<ClsModArticulo> GetByIdAsync(Guid id)
        {
            return await _articuloData.GetByIdAsync(id);
        }

        public async Task InsertRel(ClsModArticulo articulo, Guid tiendaId, SqlTransaction transaction)
        {
            await _articuloData.InsertRel(articulo, tiendaId, transaction);
        }

        public async Task DeleteByTiendaId(Guid tiendaId, SqlTransaction transaction)
        {
            await _articuloData.DeleteRelByTiendaId( tiendaId, transaction);
        }

        public async Task<PaginateResult<ClsModArticulo>> GetAllPaginate(PaginateRequest paginateRequest)
        {
           return await _articuloData.GetAllPaginate(paginateRequest);
        }
    }
}
