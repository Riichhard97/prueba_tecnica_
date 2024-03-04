
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace ClbSharePT.Helpers
{
    public class FileService
    {
        private readonly string _basePath;

        public FileService(string basePath)
        {
            _basePath = basePath;
        }

        public async Task<byte[]> GetImage(string imageName)
        {


            var imagePath = Path.Combine(_basePath, imageName);

            if (!System.IO.File.Exists(imagePath))
            {
                imagePath = Path.Combine(_basePath, "default.jpeg");
            }

            var imageBytes = System.IO.File.ReadAllBytes(imagePath);
            return imageBytes;
        }

        public async Task<string> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("No se proporcionó ningún archivo o el archivo está vacío.");
            }

            if (!Directory.Exists(_basePath))
            {
                Directory.CreateDirectory(_basePath);
            }

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";

            var filePath = Path.Combine(_basePath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        private readonly Dictionary<string, string> ContentTypeMappings = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { ".jpg", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".png", "image/png" },
            { ".gif", "image/gif" },
        };
        public string GetContentType(string fileName)
        {
            var extension = System.IO.Path.GetExtension(fileName);
            if (ContentTypeMappings.TryGetValue(extension, out var contentType))
            {
                return contentType;
            }
            return "application/octet-stream"; // Tipo de contenido por defecto si la extensión no se encuentra
        }
    }
}