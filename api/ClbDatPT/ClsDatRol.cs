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
    }
}
