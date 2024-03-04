using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using ClbNegPT;
using ClbModPT;
using Microsoft.Extensions.Configuration;
using ClbSharePT;
using System.Collections.Generic;

namespace PruebaTecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticuloController : ControllerBase
    {
        private readonly ClsNegArticulo _negocioArticulo;

        public ArticuloController(IConfiguration configuration)
        {
            _negocioArticulo = new ClsNegArticulo(configuration);
        }

        [HttpPost]
        public async Task<IActionResult> InsertarArticulo([FromBody] ClsModArticulo modArticulo)
        {
            try
            {
                await _negocioArticulo.Insert(modArticulo);
                return Ok(new ApiResponse<string>(true, "Artículo insertado correctamente.", null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al insertar el artículo: {ex.Message}", null));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var article = await _negocioArticulo.GetByIdAsync(id);
                if (article == null)
                {
                    return NotFound(new ApiResponse<string>(false, "Artículo no encontrado.", null));
                }
                return Ok(new ApiResponse<ClsModArticulo>(true, "Artículo obtenido correctamente.", article));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al obtener el artículo: {ex.Message}", null));
            }
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerArticulos()
        {
            try
            {
                var articulos = await _negocioArticulo.GetAll();
                return Ok(new ApiResponse<IEnumerable<ClsModArticulo>>(true, "Artículos obtenidos correctamente.", articulos));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al obtener los artículos: {ex.Message}", null));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarArticulo(Guid id, ClsModArticulo articulo)
        {
            if (id != articulo.Id)
            {
                return BadRequest(new ApiResponse<string>(false, "ID del artículo no coincide.", null));
            }

            try
            {
                await _negocioArticulo.Update(articulo);
                return Ok(new ApiResponse<string>(true, $"Artículo con ID {id} actualizado correctamente.", null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al actualizar el artículo: {ex.Message}", null));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarArticulo(Guid id)
        {
            try
            {
                await _negocioArticulo.Delete(id);
                return Ok(new ApiResponse<string>(true, $"Artículo con ID {id} eliminado correctamente.", null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(false, $"Error al eliminar el artículo: {ex.Message}", null));
            }
        }

    }
}
