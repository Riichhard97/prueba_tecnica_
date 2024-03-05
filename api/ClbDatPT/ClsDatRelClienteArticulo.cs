﻿using ClbModPT;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
namespace ClbDatPT
{
    public class ClsDatRelClienteArticulo
    {
        private readonly string _connectionString;

        public ClsDatRelClienteArticulo(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task Insert(ClsModRelClienteArticulo obj, SqlTransaction transaction)
        {
            await transaction.Connection.ExecuteAsync("SpRelClienteArticuloInsert", new { 
                ClienteId = obj.ClienteId,
                ArticuloId = obj.ArticuloId,
                Cantidad = obj.Cantidad
            }, transaction, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<ClsModRelClienteArticulo>> GetAll()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return (await connection.QueryAsync<ClsModRelClienteArticulo>("SpRelClienteArticuloGetAll", commandType: CommandType.StoredProcedure)).AsList();
            }
        }

        public async Task<ClsModRelClienteArticulo> GetById(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryFirstOrDefaultAsync<ClsModRelClienteArticulo>("SpRelClienteArticuloGetById", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Update(ClsModRelClienteArticulo obj)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync("SpRelClienteArticuloUpdate", new { Id = obj.Id, ClienteId = obj.ClienteId, TiendaId = obj.ArticuloId, Cantidad = obj.Cantidad }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Delete(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync("SpRelClienteArticuloDelete", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
