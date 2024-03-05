using ClbNegPT;
using ClbModPT;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using ClbSharePT;
using System.Collections.Generic;
using ClbNegPT.Coordinator;
using ClbModPT.Dto;

namespace PruebaTecnica.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TiendaController : ControllerBase
    {
        private readonly ClsNegTienda _objNegTienda;
        private readonly ClsNegArticulo _objNegArticulo;
        private readonly ClsCorNegTienda _objCorNegTienda;

        public TiendaController(IConfiguration configuration)
        {
            _objNegTienda = new ClsNegTienda(configuration);
            _objNegArticulo = new ClsNegArticulo(configuration);
            _objCorNegTienda = new ClsCorNegTienda(_objNegTienda, _objNegArticulo, configuration);
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromBody] ClsModTienda model)
        {
            try
            {
                await _objCorNegTienda.AgregarTiendaConArticulos(model);
                return Ok(new ApiResponse<string>(true, "Tienda insertada correctamente.", null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al insertar la tienda: {ex.Message}", null));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var tiendas = await _objNegTienda.GetAll();
                return Ok(new ApiResponse<List<ClsModTienda>>(true, "Tiendas obtenidas correctamente.", tiendas));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al obtener las tiendas: {ex.Message}", null));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ClsModTienda model)
        {
            try
            {
                await _objCorNegTienda.EditarTiendaConArticulos(model);
                return Ok(new ApiResponse<string>(true, "Tienda actualizada correctamente.", null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al actualizar la tienda: {ex.Message}", null));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var tienda = await _objNegTienda.GetById(id);
                if (tienda == null)
                {
                    return NotFound(new ApiResponse<string>(false, "Tienda no encontrada", null));
                }
                return Ok(new ApiResponse<ClsModTienda>(true, "Tienda encontrada", tienda));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al obtener la tienda: {ex.Message}", null));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _objCorNegTienda.EliminarTiendaConArticulos(id);
                return Ok(new ApiResponse<string>(true, "Tienda eliminada correctamente.", null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al eliminar la tienda: {ex.Message}", null));
            }
        }

        [HttpPost("GetAllPaginate")]
        public async Task<IActionResult> GetAllPaginate(PaginateRequest paginateRequest)
        {
            try
            {
                var articulos = await _objNegTienda.GetAllPaginate(paginateRequest);
                return Ok(new ApiResponse<PaginateResult<ClsModTienda>>(true, "Artículos obtenidos correctamente.", articulos));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al obtener los artículos: {ex.Message}", null));
            }
        }

    }
}
