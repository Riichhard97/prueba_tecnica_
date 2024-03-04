using ClbSharePT.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using ClbSharePT;
using System.IO;
using System.Collections.Generic;

namespace PruebaTecnica.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        private readonly FileService _fileService;

        public FileController(FileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            try
            {
                var fileName = await _fileService.UploadFile(file);
                return Ok(new ApiResponse<string>(true,"Cargado Correctamente",fileName));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("images/{imageName}")]
        public async Task<IActionResult> GetImage(string imageName)
        {
            var imageBytes = await _fileService.GetImage(imageName);
            return File(imageBytes, _fileService.GetContentType(imageName)); 
        }
       
    }
}
