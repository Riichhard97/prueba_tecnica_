using ClbModPT;
using ClbModPT.Dto;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbNegPT.Coordinator
{
    public class ClsCorNegCompras
    {
        private readonly ClsNegRelClienteArticulo _objNegRelClienteArticulo;
        private readonly string _connectionString;
        public ClsCorNegCompras(ClsNegRelClienteArticulo objNegRelClienteArticulo, IConfiguration configuration)
        {
            _objNegRelClienteArticulo = objNegRelClienteArticulo;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task InsertCompra(CompraDto objCompra)
        {
            if (objCompra == null)
            {
                throw new ArgumentNullException(nameof(objCompra), "El objeto de compra no puede ser nulo");
            }

            if (string.IsNullOrEmpty(objCompra.ClientId))
            {
                throw new ArgumentException("ClientId no puede ser nulo o vacío", nameof(objCompra.ClientId));
            }

            if (objCompra.Articles == null || !objCompra.Articles.Any())
            {
                throw new ArgumentException("La lista de artículos no puede ser nula o vacía", nameof(objCompra.Articles));
            }

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in objCompra.Articles)
                        {
                            if (item == null)
                            {
                                throw new ArgumentNullException( "El objeto de detalle de compra no puede ser nulo");
                            }

                            if (item.ArticuloId == null)
                            {
                                throw new ArgumentNullException( "El artículo no puede ser nulo");
                            }

                            if (item.Cantidad <= 0)
                            {
                                throw new ArgumentException("La cantidad de artículos debe ser mayor que cero");
                            }

                            ClsModRelClienteArticulo clsModRelClienteArticulo = new ClsModRelClienteArticulo()
                            {
                                ClienteId = Guid.Parse(objCompra.ClientId),
                                ArticuloId = Guid.Parse(item.ArticuloId),
                                Cantidad = item.Cantidad
                            };
                            await _objNegRelClienteArticulo.Insert(clsModRelClienteArticulo, transaction);
                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new InvalidOperationException("Error al agregar la tienda y sus artículos", ex);
                    }
                }
            }
        }
    }
}
