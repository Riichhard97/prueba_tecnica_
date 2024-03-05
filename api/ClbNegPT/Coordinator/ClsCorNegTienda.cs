using ClbDatPT;
using ClbModPT;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClbNegPT.Coordinator
{
    public class ClsCorNegTienda
    {
        private readonly ClsNegTienda _negocioTienda;
        private readonly ClsNegArticulo _negocioArticulo;
        private readonly string _connectionString;
        public ClsCorNegTienda(ClsNegTienda negocioTienda, ClsNegArticulo negocioArticulo, IConfiguration configuration)
        {
            _negocioTienda = negocioTienda;
            _negocioArticulo = negocioArticulo;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task AgregarTiendaConArticulos(ClsModTienda tienda)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        tienda.Id = Guid.NewGuid();
                        var tiendaId = await _negocioTienda.Insert(tienda, transaction);

                        foreach (var articulo in tienda.lstArticulos)
                        {
                            await _negocioArticulo.InsertRel(articulo, tiendaId, transaction);
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

        public async Task EditarTiendaConArticulos(ClsModTienda tienda)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // Actualizar la información de la tienda
                        await _negocioTienda.Update(tienda, transaction);

                        // Eliminar todas las relaciones de artículos de la tienda
                        await _negocioArticulo.DeleteByTiendaId(tienda.Id, transaction);

                        // Insertar las nuevas relaciones de artículos de la tienda
                        foreach (var articulo in tienda.lstArticulos)
                        {
                            await _negocioArticulo.InsertRel(articulo, tienda.Id, transaction);
                        }

                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new InvalidOperationException("Error al editar la tienda y sus artículos", ex);
                    }
                }
            }
        }
        public async Task EliminarTiendaConArticulos(Guid tiendaId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // Eliminar todas las relaciones de artículos de la tienda
                        await _negocioArticulo.DeleteByTiendaId(tiendaId, transaction);

                        // Eliminar la tienda
                        await _negocioTienda.Delete(tiendaId, transaction);

                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new InvalidOperationException("Error al eliminar la tienda y sus artículos", ex);
                    }
                }
            }
        }

    }
}
