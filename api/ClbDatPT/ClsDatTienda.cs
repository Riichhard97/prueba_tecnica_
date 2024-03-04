using ClbModPT;
using ClbModPT.Dto;
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
    public class ClsDatTienda
    {
        private readonly string _connectionString;

        public ClsDatTienda(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task Insert(string sucursal, string direccion, int telefono)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync("SpTiendaInsert", new { Sucursal = sucursal, Direccion = direccion, Telefono = telefono }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<List<ClsModTienda>> GetAll()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return (await connection.QueryAsync<ClsModTienda>("SpTiendasGetAll", commandType: CommandType.StoredProcedure)).ToList();
            }
        }
        public async Task<ClsModTienda> GetById(Guid tiendaId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@TiendaId", tiendaId, DbType.Guid);

                var tiendaDictionary = new Dictionary<Guid, ClsModTienda>();

                var result = await connection.QueryAsync<ClsModTienda, ArticuloDto, ClsModTienda>(
                    "SpTiendaGetById",
                    (tienda, articulo) =>
                    {
                        ClsModTienda tiendaEntry;

                        if (!tiendaDictionary.TryGetValue(tienda.Id, out tiendaEntry))
                        {
                            tiendaEntry = tienda;
                            tiendaEntry.lstArticulos = new List<ClsModArticulo>();
                            tiendaDictionary.Add(tiendaEntry.Id, tiendaEntry);
                        }

                        if (articulo != null)
                        {
                            ClsModArticulo clsModArticulo = new ClsModArticulo
                            {
                                Id = articulo.ArticuloId,
                                Codigo = articulo.Codigo,
                                Descripcion = articulo.Descripcion,
                                Precio = articulo.Precio,
                                Image = articulo.Image,
                                Cantidad = articulo.Cantidad
                            };

                            tiendaEntry.lstArticulos.Add(clsModArticulo);
                        }

                        return tiendaEntry;
                    },
                    parameters,
                    splitOn: "ArticuloId"
                );

                return result.FirstOrDefault(); // Devolver el primer elemento del resultado
            }
        }


        public async Task Update(ClsModTienda objModTienda)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync("SpTiendaEdit", new { TiendaId = objModTienda.Id, Sucursal = objModTienda.Sucursal, Direccion = objModTienda.Direccion, Telefono = objModTienda.Telefono }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Delete(Guid tiendaId, SqlTransaction transaction)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@StoreId", tiendaId, DbType.Guid);

            await transaction.Connection.ExecuteAsync("SpTiendaDelete", parameters, transaction, commandType: CommandType.StoredProcedure);
        }

        public async Task<Guid> Insert(ClsModTienda tienda, SqlTransaction transaction)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Sucursal", tienda.Sucursal);
            parameters.Add("@Direccion", tienda.Direccion);
            parameters.Add("@Telefono", tienda.Telefono);
            parameters.Add("@TiendaId", tienda.Id, DbType.Guid);

            await transaction.Connection.ExecuteAsync("SpTiendaInsertReturnId", parameters, transaction, commandType: CommandType.StoredProcedure);

            return parameters.Get<Guid>("@TiendaId");
        }

        public async Task Update(ClsModTienda objModTienda, SqlTransaction transaction)
        {
            await transaction.Connection.ExecuteAsync("SpTiendaEdit",
                new { 
                    TiendaId = objModTienda.Id,
                    Sucursal = objModTienda.Sucursal,
                    Direccion = objModTienda.Direccion,
                    Telefono = objModTienda.Telefono },
                 transaction, commandType: CommandType.StoredProcedure);
        }
    }
}
