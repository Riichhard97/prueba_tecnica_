using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbModPT
{
    public class ClsModUsuario : ClsModBase
    {
        public string NombreUsuario { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }
        public Guid ClienteId { get; set; }
        public Guid RoleId { get; set; }
        public string? Rol { get; set; }
        public string? Cliente { get; set; }
        public DateTime FechaUltimoAcceso { get; set; }
    }
}
