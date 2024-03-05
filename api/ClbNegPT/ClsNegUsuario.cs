using ClbDatPT;
using ClbModPT;
using ClbModPT.Dto;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClbNegPT
{
    public class ClsNegUsuario
    {
        private readonly ClsDatUsuario _usuarioData;

        public ClsNegUsuario(IConfiguration configuration)
        {
            _usuarioData = new ClsDatUsuario(configuration);
        }

        public async Task Insert(ClsModUsuario usuario)
        {
            if (string.IsNullOrWhiteSpace(usuario.Correo))
            {
                throw new ArgumentException("El correo es obligatorio.");
            }

            await _usuarioData.Insert(usuario);
        }

        public async Task<IEnumerable<ClsModUsuario>> GetAll()
        {
            return await _usuarioData.GetAll();
        }

        public async Task Update(ClsModUsuario usuario)
        {
            if (usuario.Id == Guid.Empty)
            {
                throw new ArgumentException("El ID del usuario es inválido.");
            }

            if (string.IsNullOrWhiteSpace(usuario.Correo))
            {
                throw new ArgumentException("El correo es obligatorio.");
            }
            await _usuarioData.Update(usuario);
        }

        public async Task Delete(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentException("El ID del usuario es inválido.");
            }

            await _usuarioData.Delete(id);
        }

        public async Task<ClsModUsuario> GetById(Guid id)
        {
            return await _usuarioData.GetById(id);
        }

        public async Task<string> Login(ClsModUsuario usuario)
        {
            if (string.IsNullOrWhiteSpace(usuario.Correo) || string.IsNullOrWhiteSpace(usuario.Password))
            {
                throw new ArgumentException("El correo y la contraseña son obligatorios.");
            }

            return await _usuarioData.Login(usuario);
        }

        public async Task<PaginateResult<ClsModUsuario>> GetAllPaginate(PaginateRequest paginateRequest)
        {
            return await _usuarioData.GetAllPaginate(paginateRequest);
        }
    }
}
