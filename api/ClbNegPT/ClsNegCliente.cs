using ClbDatPT;
using ClbModPT;
using ClbModPT.Dto;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClbNegPT
{
    public class ClsNegCliente
    {
        private readonly ClsDatCliente _clienteData;

        public ClsNegCliente(IConfiguration configuration)
        {
            _clienteData = new ClsDatCliente(configuration);
        }

        public async Task Insert(ClsModCliente modCliente)
        {
            await _clienteData.Insert(modCliente);
        }

        public async Task<IEnumerable<ClsModCliente>> GetAll()
        {
            return await _clienteData.GetAll();
        }

        public async Task Update(ClsModCliente cliente)
        {
            await _clienteData.Update(cliente);
        }

        public async Task Delete(Guid clienteId)
        {
            await _clienteData.Delete(clienteId);
        }

        public async Task<ClsModCliente> GetById(string id)
        {
            return await _clienteData.GetById(id);
        }

        public async Task<PaginateResult<ClsModCliente>> GetAllPaginate(PaginateRequest paginateRequest)
        {
            return await _clienteData.GetAllPaginate(paginateRequest);

        }
    }
}
