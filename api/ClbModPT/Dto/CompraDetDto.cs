using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbModPT.Dto
{
    public class CompraDetDto
    {
        public virtual ClsModArticulo Articulo { get; set; }
        public string ArticuloId { get; set; }
        public int Cantidad { get; set; }
    }
}
