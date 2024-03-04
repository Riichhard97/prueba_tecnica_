using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbModPT
{
    public class ClsModTienda : ClsModBase
    {
        public string Sucursal { get; set; }
        public string Direccion { get; set; }
        public int Telefono { get; set; }
        public virtual List<ClsModArticulo> lstArticulos { get; set; }
    }
}
