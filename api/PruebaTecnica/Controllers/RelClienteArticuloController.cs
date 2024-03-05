using ClbModPT;
using ClbNegPT;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using ClbModPT.Dto;
using ClbNegPT.Coordinator;
using Microsoft.Extensions.Configuration;
using ClbSharePT;

namespace PruebaTecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelClienteArticuloController : ControllerBase
    {
        private readonly ClsNegRelClienteArticulo _objNegRelClienteArticulo;
        private readonly ClsCorNegCompras _clsCorNegCompras;

        public RelClienteArticuloController(IConfiguration configuration)
        {
            _objNegRelClienteArticulo = new ClsNegRelClienteArticulo(configuration);
            _clsCorNegCompras = new ClsCorNegCompras(_objNegRelClienteArticulo, configuration);
        }

        [HttpGet]
        public async Task<ActionResult<List<ClsModRelClienteArticulo>>> GetAll()
        {
            try
            {
                var relClienteArticulos = await _objNegRelClienteArticulo.GetAll();
                return Ok(relClienteArticulos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClsModRelClienteArticulo>> GetById(Guid id)
        {
            try
            {
                var relClienteArticulo = await _objNegRelClienteArticulo.GetById(id);
                if (relClienteArticulo == null)
                {
                    return NotFound();
                }
                return Ok(relClienteArticulo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Insert([FromBody] CompraDto objCompra)
        {
            try
            {
                await _clsCorNegCompras.InsertCompra(objCompra);
                return Ok(new ApiResponse<string>(true, "Compra creada correctamente.",null));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
