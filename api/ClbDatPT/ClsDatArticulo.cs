using ClbModPT;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbDatPT
{
    public class ClsDatArticulo
    {
        private readonly string _connectionString;

        public ClsDatArticulo(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task Insert(ClsModArticulo modArticulo)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync("SpArticuloInsert", new { Codigo = modArticulo.Codigo, Descripcion = modArticulo.Descripcion, Precio = modArticulo.Precio, Image = modArticulo.Image }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<IEnumerable<ClsModArticulo>> GetAll()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<ClsModArticulo>("SpArticulosGetAll", commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Update(ClsModArticulo objModArticulo)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
               await connection.ExecuteAsync("SpArticuloEdit", new { ArticuloId = objModArticulo.Id, Codigo = objModArticulo.Codigo, Descripcion = objModArticulo.Descripcion, Precio = objModArticulo.Precio, Image = objModArticulo.Image }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Delete(Guid articuloId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ArticuloId", articuloId, DbType.Guid);

                await connection.ExecuteAsync("SpArticuloDelete", parameters, commandType: CommandType.StoredProcedure);
            }
        }


        public async Task<ClsModArticulo> GetByIdAsync(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryFirstOrDefaultAsync<ClsModArticulo>("SpArticulosGetById", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task InsertRel(ClsModArticulo articulo, Guid tiendaId, SqlTransaction transaction)
        {
            await transaction.Connection.ExecuteAsync("SpRelArticuloTiendaInsert", new 
            {
                ArticuloId = articulo.Id,
                TiendaId = tiendaId,
                Cantidad = articulo.Cantidad
            }, transaction, commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteRelByTiendaId(Guid tiendaId, SqlTransaction transaction)
        {
            await transaction.Connection.ExecuteAsync("SpRelArticuloTiendaDeleteByTiendaId", new
            {
                tiendaId = tiendaId
            }, transaction, commandType: CommandType.StoredProcedure);
        }
    }
}
