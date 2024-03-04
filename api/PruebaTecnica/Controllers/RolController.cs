using ClbModPT;
using ClbNegPT;
using ClbSharePT;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace PruebaTecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly ClsNegRol _roleService;
        public RolController(IConfiguration configuration)
        {
            _roleService = new ClsNegRol(configuration);
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ClsModRol>>>> GetAllRoles()
        {
            var response = new ApiResponse<IEnumerable<ClsModRol>>(true, "Roles obtenidos exitosamente", null);
            try
            {
                var roles = await _roleService.GetAllRoles();
                response.Data = roles;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error al obtener los roles: " + ex.Message;
            }
            return Ok(response);
        }
    }
}
