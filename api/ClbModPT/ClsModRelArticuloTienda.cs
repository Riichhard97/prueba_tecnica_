using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbModPT
{
    public class ClsModRelArticuloTienda : ClsModBase
    {
        public Guid ArticuloId { get; set; }
        public virtual ClsModArticulo Articulo { get; set; }
        public Guid TiendaId { get; set; }
        public virtual ClsModTienda Tienda { get; set; }
        public int Cantidad { get; set; }
        public DateTime Fecha { get; set; }
    }
}
