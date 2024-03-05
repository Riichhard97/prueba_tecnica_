***Importante***
Antes de ejecutar la api o app, ejecutar el script de sql, este trae las tablas y datos necesarios para que el sistema funcione

Se presenta una prueba técnica que incluye el diseño y la implementación de una base de datos SQL denominada "pt" (Prueba Técnica), diseñada para respaldar un sistema de gestión de tiendas en línea. Aunque la descripción de la base de datos proporcionada carece de detalles específicos, se ha desarrollado una estructura base.

<img width="384" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/bf220df1-06aa-46ec-9111-c487553ebc64">

La base de datos "pt" consta de múltiples tablas, incluidas las relacionadas con clientes, tiendas, usuarios, artículos y el historial de compras.

Se ha implementado un script de base de datos que puede ejecutarse en SQL Server Management Studio (SSMS) para crear la base de datos "pt" y poblarla con datos de prueba. Además, se han incluido procedimientos almacenados para realizar operaciones administrativas como la paginación de datos y la autenticación de usuarios utilizando JSON Web Tokens (JWT).

Se han definido dos roles principales en el sistema: administrador y cliente. Los usuarios que no esten identificados pueden navegar por la tienda, agregar elementos al carrito y realizar compras, pero se les solicitará autenticarse al momento de la compra.Los administradores tienen acceso a funciones administrativas para gestionar clientes, tiendas, usuarios, artículos y el historial de compras.

Es importante tener en cuenta que la contraseña predeterminada para todos los usuarios es '123', se encripto la contraseña utilizando sha2-256 y un salt para generar la contraseña encriptada
El sistema utiliza paginación del lado del servidor para optimizar el rendimiento y la eficiencia en la manipulación de grandes conjuntos de datos.

Algunas fotos del sistema:


<img width="758" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/4ce6cbd9-7004-4a15-9a0c-9e34a451dc6d">

<img width="648" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/1e7f4c9e-047b-4ca5-a30c-bbff9be64428">

<img width="1148" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/65dffe26-ac31-460d-9cda-2ddb92935ee0">

<img width="1179" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/d6aace7e-34ab-4b80-9853-56d4e94cd8b5">

<img width="1238" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/49d14670-db3b-435f-9fcb-98cb6f3da758">

<img width="1566" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/6f658b5f-2f4f-45dc-b7ad-76193a0fe69a">

<img width="1300" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/d78567c3-b8ad-44e6-b887-ea0d61c06917">

<img width="1238" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/c8c9eba9-efe7-4363-a9f5-d82103c08b83">

<img width="1281" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/cb08f9c6-a5a0-4edf-a7b6-c4c49116d710">

<img width="1083" alt="image" src="https://github.com/Riichhard97/prueba_tecnica_/assets/62078290/f434b483-bef7-4e65-99b1-9601f0e80015">
