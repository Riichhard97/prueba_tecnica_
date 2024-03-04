using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbModPT
{
    public class ClsModUsuario : ClsModBase
    {
        public string Nombre { get; set; }
        public string Password { get; set; }
        public Guid ClienteId { get; set; }
        public Guid RoleId { get; set; }
        public virtual ClsModRol Rol { get; set; }
        public DateTime FechaUltimoAcceso { get; set; }
    }
}
