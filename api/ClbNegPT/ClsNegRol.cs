using ClbDatPT;
using ClbModPT;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbNegPT
{
    public class ClsNegRol
    {
        private readonly ClsDatRol _roleData;

        public ClsNegRol(IConfiguration configuration)
        {
            _roleData = new ClsDatRol(configuration);
        }

        public async Task<IEnumerable<ClsModRol>> GetAllRoles()
        {
            return await _roleData.GetAllRoles();
        }
    }
}
