using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbModPT.Dto
{
    public class CompraDto
    {
        public string Id { get; set; }
        public string ClientId { get; set; }
        public List<CompraDetDto> Articles { get; set; }
    }
}
