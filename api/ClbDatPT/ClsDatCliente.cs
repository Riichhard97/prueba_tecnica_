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
    public class ClsDatCliente
    {
        private readonly string _connectionString;

        public ClsDatCliente(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task Insert(ClsModCliente modCliente)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync("SpClienteInsert", new { Nombre = modCliente.Nombre, Apellidos = modCliente.Apellidos, Direccion = modCliente.Direccion }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<List<ClsModCliente>> GetAll()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return (await connection.QueryAsync<ClsModCliente>("SpClientesGetAll", commandType: CommandType.StoredProcedure)).ToList();
            }
        }
        public async Task<ClsModCliente> GetById(string clientId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ClientId", clientId);

                return await connection.QueryFirstOrDefaultAsync<ClsModCliente>("SpClienteGetById", parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Update(ClsModCliente objModCliente)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync("SpClienteEdit", new { ClienteId = objModCliente.Id, Nombre = objModCliente.Nombre, Apellidos = objModCliente.Apellidos, Direccion = objModCliente.Direccion }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Delete(Guid clienteId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ClientId", clienteId, DbType.Guid);

                await connection.ExecuteAsync("SpClienteDelete", parameters, commandType: CommandType.StoredProcedure);
            }
        }

    }
}
