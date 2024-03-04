using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using ClbModPT;
using System.Collections;
using System.Security.Authentication;

namespace ClbDatPT
{
    public class ClsDatUsuario
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public ClsDatUsuario(IConfiguration configuration) {
            _configuration  = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task Insert(ClsModUsuario usuario)
        {
            var salt = GenerateSalt();
            usuario.Password = await GeneratePassword("123", salt);
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@NombreUsuario", usuario.NombreUsuario, DbType.String);
                parameters.Add("@Correo", usuario.Correo, DbType.String);
                parameters.Add("@ContraseñaHash", usuario.Password, DbType.String);
                parameters.Add("@Salt", salt, DbType.Binary);
                parameters.Add("@ClienteId", usuario.ClienteId, DbType.Guid);
                parameters.Add("@RoleId", usuario.RoleId, DbType.Guid);

                var query = "SpUsuarioInsert";

                await connection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Update(ClsModUsuario usuario)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", usuario.Id, DbType.Guid);
                parameters.Add("@NombreUsuario", usuario.NombreUsuario, DbType.String);
                parameters.Add("@Correo", usuario.Correo, DbType.String);
                parameters.Add("@ClienteId", usuario.ClienteId, DbType.Guid);
                parameters.Add("@RoleId", usuario.RoleId, DbType.Guid);

                var query = "SpUsuarioUpdate"; 

                await connection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Delete(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Guid);

                var query = "SpUsuarioDelete"; 

                await connection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<List<ClsModUsuario>> GetAll()
        {
            List<ClsModUsuario> users = new List<ClsModUsuario>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                SqlCommand command = new SqlCommand("SpGetAllUsersWithDetails", connection);
                command.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        ClsModUsuario user = new ClsModUsuario();
                        user.Id = reader.GetGuid(reader.GetOrdinal("Id"));
                        user.NombreUsuario = reader.GetString(reader.GetOrdinal("NombreUsuario"));
                        user.Correo = reader.GetString(reader.GetOrdinal("Correo"));
                        user.Password = reader.GetString(reader.GetOrdinal("ContraseñaHash"));
                        user.ClienteId = reader.GetGuid(reader.GetOrdinal("ClienteId"));
                        user.RoleId = reader.GetGuid(reader.GetOrdinal("RoleId"));
                        user.Rol = reader.IsDBNull(reader.GetOrdinal("Rol")) ? null : reader.GetString(reader.GetOrdinal("Rol"));
                        user.Cliente = reader.IsDBNull(reader.GetOrdinal("Cliente")) ? null : reader.GetString(reader.GetOrdinal("Cliente"));
                        user.FechaUltimoAcceso = reader.GetDateTime(reader.GetOrdinal("FechaUltimoAcceso"));

                        users.Add(user);
                    }
                }
            }

            return users;
        }

        public async Task<ClsModUsuario> GetById(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Guid);

                var query = "SpUsuarioGetById";

                return await connection.QueryFirstOrDefaultAsync<ClsModUsuario>(query, parameters, commandType: CommandType.StoredProcedure);
            }
        }


        public async Task<string> Login(ClsModUsuario modUsuario)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("SpUsuarioLogin", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@Correo", SqlDbType.VarChar).Value = modUsuario.Correo;
                    command.Parameters.Add("@Password", SqlDbType.VarChar, 100).Direction = ParameterDirection.Output;
                    command.Parameters.Add("@RoleId", SqlDbType.UniqueIdentifier).Direction = ParameterDirection.Output;
                    command.Parameters.Add("@Salt", SqlDbType.VarBinary, 50).Direction = ParameterDirection.Output;

                    try
                    {
                        await connection.OpenAsync();
                        await command.ExecuteNonQueryAsync();

                        string password = command.Parameters["@Password"].Value.ToString();
                        byte[] salt = (byte[])command.Parameters["@Salt"].Value;
                        Guid roleId = command.Parameters["@RoleId"].Value != DBNull.Value ? (Guid)command.Parameters["@RoleId"].Value : Guid.Empty;

                        if (!string.IsNullOrEmpty(password) )
                        {
                            if(await VerifyPassword(modUsuario.Password, password, salt)) {
                                modUsuario.RoleId = roleId;
                                return await GenerateClaims(modUsuario);
                            } else
                            {
                                throw new AuthenticationException("Correo y/o contraseña incorrectos.");
                            }
                        }
                        else
                        {
                            throw new AuthenticationException("Correo y/o contraseña incorrectos.");
                        }
                    }
                    catch (SqlException ex)
                    {
                        throw new AuthenticationException("Error al autenticar al usuario.", ex);
                    }
                    finally
                    {
                        if (connection.State != ConnectionState.Closed)
                        {
                            connection.Close();
                        }
                    }
                }
            }
        }




        private async Task<string> GenerateClaims(ClsModUsuario modUsuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, modUsuario.Correo),
                    new Claim(ClaimTypes.Role, modUsuario.RoleId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };


            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }
        private static byte[] GenerateSalt()
        {
            byte[] salt = new byte[16];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        private async Task<string> GeneratePassword(string password, byte[] salt)
        {
            using (var sha256 = new SHA256CryptoServiceProvider())
            {
                var saltedPassword = Encoding.UTF8.GetBytes(password).Concat(salt).ToArray();
                var hashedPassword = sha256.ComputeHash(saltedPassword);
                return Convert.ToBase64String(hashedPassword);
            }
        }

        private async Task<bool> VerifyPassword(string enteredPassword, string storedHash, byte[] storedSalt)
        {
            var passwordGenerateByStoreSalt = await GeneratePassword(enteredPassword, storedSalt);

            return storedHash == passwordGenerateByStoreSalt;
        }
    }
}
