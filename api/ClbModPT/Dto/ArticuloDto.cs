using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbModPT.Dto
{
    public class ArticuloDto
    {
        public Guid ArticuloId { get; set; }
        public Guid Id { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public double Precio { get; set; }
        public string Image { get; set; }
        public int Cantidad { get; set; }
    }
}
