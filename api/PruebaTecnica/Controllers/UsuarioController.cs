using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using ClbNegPT;
using Microsoft.Extensions.Configuration;
using ClbModPT;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Linq;
using ClbSharePT;
using System.Collections.Generic;

namespace PruebaTecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly ClsNegUsuario _usuarioNegocio;
        private readonly IConfiguration _configuration;

        public UsuarioController(IConfiguration configuration)
        {
            _configuration = configuration;
            _usuarioNegocio = new ClsNegUsuario(_configuration);
        }
       
        [HttpPost]
        public async Task<ActionResult<ApiResponse<Guid>>> Insert(ClsModUsuario usuario)
        {
            try
            {
                await _usuarioNegocio.Insert(usuario);
                return new ApiResponse<Guid>(true, "Usuario creado correctamente", usuario.Id);
            }
            catch (Exception ex)
            {
                return new ApiResponse<Guid>(false, "Error al crear el usuario: " + ex.Message, Guid.Empty);
            }
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ClsModUsuario>>>> GetAll()
        {
            try
            {
                var usuarios = await _usuarioNegocio.GetAll();
                return new ApiResponse<IEnumerable<ClsModUsuario>>(true, "Usuarios obtenidos correctamente", usuarios);
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<ClsModUsuario>>(false, "Error al obtener los usuarios: " + ex.Message, null);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<ClsModUsuario>>> GetById(Guid id)
        {
            try
            {
                var usuario = await _usuarioNegocio.GetById(id);
                if (usuario == null)
                {
                    return NotFound(new ApiResponse<ClsModUsuario>(false, "Usuario no encontrado", null));
                }
                return new ApiResponse<ClsModUsuario>(true, "Usuario obtenido correctamente", usuario);
            }
            catch (Exception ex)
            {
                return new ApiResponse<ClsModUsuario>(false, "Error al obtener el usuario: " + ex.Message, null);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<object>>> Update(Guid id, ClsModUsuario usuario)
        {
            try
            {
                if (id != usuario.Id)
                {
                    return BadRequest(new ApiResponse<object>(false, "El ID del usuario no coincide con el ID proporcionado", null));
                }

                await _usuarioNegocio.Update(usuario);
                return new ApiResponse<object>(true, "Usuario actualizado correctamente", null);
            }
            catch (Exception ex)
            {
                return new ApiResponse<object>(false, "Error al actualizar el usuario: " + ex.Message, null);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<object>>> Delete(Guid id)
        {
            try
            {
                await _usuarioNegocio.Delete(id);
                return new ApiResponse<object>(true, "Usuario eliminado correctamente", null);
            }
            catch (Exception ex)
            {
                return new ApiResponse<object>(false, "Error al eliminar el usuario: " + ex.Message, null);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<string>>> Login([FromBody] ClsModUsuario usuario)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(usuario.Correo) || string.IsNullOrWhiteSpace(usuario.Password))
                {
                    return BadRequest("Correo y contraseña son obligatorios");
                }

                var token = await _usuarioNegocio.Login(usuario);
                if (token == null)
                {
                    return Unauthorized("Credenciales inválidas");
                }
                return Ok(new ApiResponse<string>(true, "Autenticado correctamente", token));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error en el servidor: {ex.Message}");
            }
        }
    }
}
