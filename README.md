Se presenta una prueba técnica que incluye el diseño y la implementación de una base de datos SQL denominada "pt" (Prueba Técnica), diseñada para respaldar un sistema de gestión de tiendas en línea. Aunque la descripción de la base de datos proporcionada carece de detalles específicos, se ha desarrollado una estructura base.
<img width="384" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/bf220df1-06aa-46ec-9111-c487553ebc64">

La base de datos "pt" consta de múltiples tablas, incluidas las relacionadas con clientes, tiendas, usuarios, artículos y el historial de compras. La base de datos se ha diseñado considerando la posibilidad de una futura expansión, como la adición de tablas para inventarios, sucursales, entre otras.

Se ha implementado un script de base de datos que puede ejecutarse en SQL Server Management Studio (SSMS) para crear la base de datos "pt" y poblarla con datos de prueba. Además, se han incluido procedimientos almacenados para realizar operaciones administrativas como la paginación de datos y la autenticación de usuarios utilizando JSON Web Tokens (JWT).

Se han definido dos roles principales en el sistema: administrador y cliente. Los usuarios que no esten identificados pueden navegar por la tienda, agregar elementos al carrito y realizar compras, pero se les solicitará autenticarse al momento de la compra.Los administradores tienen acceso a funciones administrativas para gestionar clientes, tiendas, usuarios, artículos y el historial de compras.

Es importante tener en cuenta que la contraseña predeterminada para todos los usuarios es '123' por razones de simplificación y que el sistema utiliza paginación del lado del servidor para optimizar el rendimiento y la eficiencia en la manipulación de grandes conjuntos de datos.


