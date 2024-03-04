using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbModPT.Dto
{
    public class TiendaDto
    {
        public Guid Id { get; set; }
        public string Sucursal { get; set; }
        public string Direccion { get; set; }
        public int Telefono { get; set; }
        public List<ArticuloDto> Articulos { get; set; }
    }
}
