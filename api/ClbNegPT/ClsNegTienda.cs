using ClbDatPT;
using ClbModPT;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace ClbNegPT
{
    public class ClsNegTienda
    {
        private readonly ClsDatTienda _tiendaData;

        public ClsNegTienda(IConfiguration configuration)
        {
            _tiendaData = new ClsDatTienda(configuration);
        }

        public async Task Insert(string sucursal, string direccion, int telefono)
        {
            await _tiendaData.Insert(sucursal, direccion, telefono);
        }

        public async Task<List<ClsModTienda>> GetAll()
        {
            return await _tiendaData.GetAll();
        }

        public async Task Update(ClsModTienda tienda)
        {
            await _tiendaData.Update(tienda);
        }

        public async Task Delete(Guid tiendaId, SqlTransaction transaction)
        {
            await _tiendaData.Delete(tiendaId, transaction);
        }

        public async Task<ClsModTienda> GetById(Guid id)
        {
            return await _tiendaData.GetById(id);
        }

        public async Task<Guid> Insert(ClsModTienda tienda, SqlTransaction transaction)
        {
            return await _tiendaData.Insert(tienda, transaction);

        }

        public async Task Update(ClsModTienda tienda, SqlTransaction transaction)
        {
            await _tiendaData.Update(tienda, transaction);
        }
    }
}
