using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClbModPT;
using Dapper;
using Microsoft.Extensions.Configuration;
using ClbModPT.Dto;

namespace ClbDatPT
{
    public class ClsDatRol
    {
        private readonly string _connectionString;

        public ClsDatRol(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<ClsModRol>> GetAllRoles()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<ClsModRol>("SpRolesGetAll", commandType: CommandType.StoredProcedure);
            }
        }


        public async Task<PaginateResult<ClsModArticulo>> GetAllPaginate(PaginateRequest paginateRequest)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new { PageNumber = paginateRequest.Page, PageSize = paginateRequest.PageSize };
                var result = await connection.QueryMultipleAsync("SpArticulosGetAllPaginate", parameters, commandType: CommandType.StoredProcedure);

                int totalCount = await result.ReadSingleAsync<int>();

                IEnumerable<ClsModArticulo> items = await result.ReadAsync<ClsModArticulo>();

                return new PaginateResult<ClsModArticulo>
                {
                    Items = items,
                    TotalCount = totalCount,
                    PageNumber = paginateRequest.Page,
                    PageSize = paginateRequest.PageSize
                };
            }
        }
    }
}
