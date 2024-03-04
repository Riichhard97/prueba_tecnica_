using ClbModPT;
using ClbNegPT;
using ClbSharePT;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PruebaTecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ClsNegCliente _negocioCliente;

        public ClienteController(IConfiguration configuration)
        {
            _negocioCliente = new ClsNegCliente(configuration);
        }

        [HttpPost]
        public async Task<IActionResult> InsertarCliente([FromBody] ClsModCliente modCliente)
        {
            try
            {
                await _negocioCliente.Insert(modCliente);
                return Ok(new ApiResponse<string>(true, "Cliente insertado correctamente.", null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al insertar el cliente: {ex.Message}", null));
            }
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerClientes()
        {
            try
            {
                var clientes = await _negocioCliente.GetAll();
                return Ok(new ApiResponse<IEnumerable<ClsModCliente>>(true, "Clientes obtenidos correctamente.", clientes));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al obtener los clientes: {ex.Message}", null));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var cliente = await _negocioCliente.GetById(id);
                if (cliente != null)
                {
                    return Ok(new ApiResponse<ClsModCliente>(true, "Cliente obtenido correctamente.", cliente));
                }
                else
                {
                    return NotFound(new ApiResponse<string>(false, "Cliente no encontrado.", null));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al obtener el cliente: {ex.Message}", null));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarCliente(Guid id, ClsModCliente cliente)
        {
            try
            {
                if (id != cliente.Id)
                {
                    return BadRequest(new ApiResponse<string>(false, "El ID del cliente no coincide con el ID proporcionado.", null));
                }

                await _negocioCliente.Update(cliente);
                return Ok(new ApiResponse<string>(true, "Cliente actualizado correctamente.", null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al actualizar el cliente: {ex.Message}", null));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarCliente(Guid id)
        {
            try
            {
                await _negocioCliente.Delete(id);
                return Ok(new ApiResponse<string>(true, "Cliente eliminado correctamente.", null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al eliminar el cliente: {ex.Message}", null));
            }
        }
    }
}
