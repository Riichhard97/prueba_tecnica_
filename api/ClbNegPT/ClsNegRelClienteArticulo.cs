using ClbDatPT;
using ClbModPT;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace ClbNegPT
{
    public class ClsNegRelClienteArticulo
    {
        private readonly ClsDatRelClienteArticulo _relClienteArticuloData;

        public ClsNegRelClienteArticulo(IConfiguration configuration)
        {
            _relClienteArticuloData = new ClsDatRelClienteArticulo(configuration);
        }

        public async Task Insert(ClsModRelClienteArticulo relClienteArticulo,SqlTransaction transaction )
        {
            await _relClienteArticuloData.Insert(relClienteArticulo, transaction);
        }

        public async Task<List<ClsModRelClienteArticulo>> GetAll()
        {
            return await _relClienteArticuloData.GetAll();
        }

        public async Task<ClsModRelClienteArticulo> GetById(Guid id)
        {
            return await _relClienteArticuloData.GetById(id);
        }
    }
}
