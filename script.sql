USE [master]
GO
/****** Object:  Database [pt]    Script Date: 05/03/2024 02:13:03 a. m. ******/
CREATE DATABASE [pt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'pt', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\pt.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'pt_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\pt_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [pt] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [pt].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [pt] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [pt] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [pt] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [pt] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [pt] SET ARITHABORT OFF 
GO
ALTER DATABASE [pt] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [pt] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [pt] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [pt] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [pt] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [pt] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [pt] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [pt] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [pt] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [pt] SET  DISABLE_BROKER 
GO
ALTER DATABASE [pt] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [pt] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [pt] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [pt] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [pt] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [pt] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [pt] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [pt] SET RECOVERY FULL 
GO
ALTER DATABASE [pt] SET  MULTI_USER 
GO
ALTER DATABASE [pt] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [pt] SET DB_CHAINING OFF 
GO
ALTER DATABASE [pt] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [pt] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [pt] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [pt] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'pt', N'ON'
GO
ALTER DATABASE [pt] SET QUERY_STORE = ON
GO
ALTER DATABASE [pt] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [pt]
GO
/****** Object:  Table [dbo].[Articulo]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Articulo](
	[Id] [uniqueidentifier] NOT NULL,
	[Codigo] [varchar](255) NULL,
	[Descripcion] [varchar](max) NULL,
	[Precio] [float] NULL,
	[Image] [varchar](max) NULL,
	[Activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[Id] [uniqueidentifier] NOT NULL,
	[Nombre] [varchar](255) NULL,
	[Apellidos] [varchar](255) NULL,
	[Direccion] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RelArticuloTienda]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RelArticuloTienda](
	[Id] [uniqueidentifier] NOT NULL,
	[ArticuloId] [uniqueidentifier] NULL,
	[Cantidad] [int] NULL,
	[TiendaId] [uniqueidentifier] NULL,
	[Fecha] [datetime] NULL,
 CONSTRAINT [PK__RelArtic__3214EC070661958A] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RelClienteArticulo]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RelClienteArticulo](
	[Id] [uniqueidentifier] NOT NULL,
	[ClienteId] [uniqueidentifier] NULL,
	[ArticuloId] [uniqueidentifier] NULL,
	[Cantidad] [int] NULL,
	[Fecha] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[Id] [uniqueidentifier] NOT NULL,
	[Rol] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tienda]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tienda](
	[Id] [uniqueidentifier] NOT NULL,
	[Sucursal] [varchar](255) NULL,
	[Direccion] [varchar](max) NULL,
	[Telefono] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [uniqueidentifier] NOT NULL,
	[NombreUsuario] [varchar](50) NOT NULL,
	[Correo] [varchar](100) NOT NULL,
	[ContraseñaHash] [varchar](100) NOT NULL,
	[Salt] [varbinary](50) NOT NULL,
	[ClienteId] [uniqueidentifier] NULL,
	[RoleId] [uniqueidentifier] NOT NULL,
	[FechaUltimoAcceso] [datetime] NULL,
 CONSTRAINT [PK__Usuario__3214EC07A08A5D0E] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Articulo] ([Id], [Codigo], [Descripcion], [Precio], [Image], [Activo]) VALUES (N'0cad04a9-b3fd-4f66-8c40-efba46273815', N'ART93', N'Articulo de Prueba', 12, N'1de1f6c0-4320-4f14-9428-2f2a71173871_default.jpeg', 1)
GO
INSERT [dbo].[Cliente] ([Id], [Nombre], [Apellidos], [Direccion]) VALUES (N'78f4689e-98bd-42cb-94ef-b0f0ca85a099', N'Cliente', N'Prueba', N'Plaza Mayor, 782')
GO
INSERT [dbo].[RelArticuloTienda] ([Id], [ArticuloId], [Cantidad], [TiendaId], [Fecha]) VALUES (N'be541977-11ee-48d9-af70-6aa35f916216', N'0cad04a9-b3fd-4f66-8c40-efba46273815', 12, N'1e465a2a-2d49-46d3-a51d-6f5a7fa42506', CAST(N'2024-03-05T02:11:28.267' AS DateTime))
GO
INSERT [dbo].[RelClienteArticulo] ([Id], [ClienteId], [ArticuloId], [Cantidad], [Fecha]) VALUES (N'7cec7c0b-abcf-4ee5-b415-8ff7a881c2bb', N'78f4689e-98bd-42cb-94ef-b0f0ca85a099', N'0cad04a9-b3fd-4f66-8c40-efba46273815', 2, CAST(N'2024-03-05T02:11:41.920' AS DateTime))
GO
INSERT [dbo].[Role] ([Id], [Rol]) VALUES (N'f4fe3a4b-16dc-4f68-88f0-568dc59aaa9f', N'Cliente')
INSERT [dbo].[Role] ([Id], [Rol]) VALUES (N'24ac00bb-b55b-4758-9c26-e599d4e94ba0', N'Administrador')
GO
INSERT [dbo].[Tienda] ([Id], [Sucursal], [Direccion], [Telefono]) VALUES (N'1e465a2a-2d49-46d3-a51d-6f5a7fa42506', N'Tienda', N'Prueba #14', 0)
GO
INSERT [dbo].[Usuario] ([Id], [NombreUsuario], [Correo], [ContraseñaHash], [Salt], [ClienteId], [RoleId], [FechaUltimoAcceso]) VALUES (N'45bb2722-a3fc-4158-9d8d-535b12968334', N'admin', N'admin@gmail.com', N'qkfjnBDiE458o8w4M3KBfHYXLGcUjOlGWG/+gva2P5I=', 0x48A73BF69498EF95C4D42DDC1EB14615, NULL, N'24ac00bb-b55b-4758-9c26-e599d4e94ba0', CAST(N'2024-03-05T02:06:15.650' AS DateTime))
INSERT [dbo].[Usuario] ([Id], [NombreUsuario], [Correo], [ContraseñaHash], [Salt], [ClienteId], [RoleId], [FechaUltimoAcceso]) VALUES (N'603c5b1e-e1cc-4e3e-88da-a42e9e3099e0', N'cliente', N'cliente@gmail.com', N'EUKx+jIbr9FLgtyQYkQX8ZBaW4bjbG+t2DdbC52ohAU=', 0x30DC85FA54FD1C4B8C5CCAED73768F66, N'78f4689e-98bd-42cb-94ef-b0f0ca85a099', N'f4fe3a4b-16dc-4f68-88f0-568dc59aaa9f', CAST(N'2024-03-05T02:06:27.583' AS DateTime))
GO
ALTER TABLE [dbo].[Articulo] ADD  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Articulo] ADD  CONSTRAINT [DF_Articulo_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Cliente] ADD  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[RelArticuloTienda] ADD  CONSTRAINT [DF__RelArticuloT__Id__52593CB8]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[RelClienteArticulo] ADD  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Role] ADD  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Tienda] ADD  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Usuario] ADD  CONSTRAINT [DF__Usuario__Id__06CD04F7]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Usuario] ADD  CONSTRAINT [DF_Usuario_FechaUltimoAcceso]  DEFAULT (getdate()) FOR [FechaUltimoAcceso]
GO
ALTER TABLE [dbo].[RelArticuloTienda]  WITH CHECK ADD  CONSTRAINT [FK__RelArticu__Artic__534D60F1] FOREIGN KEY([ArticuloId])
REFERENCES [dbo].[Articulo] ([Id])
GO
ALTER TABLE [dbo].[RelArticuloTienda] CHECK CONSTRAINT [FK__RelArticu__Artic__534D60F1]
GO
ALTER TABLE [dbo].[RelArticuloTienda]  WITH CHECK ADD  CONSTRAINT [FK__RelArticu__Tiend__5441852A] FOREIGN KEY([TiendaId])
REFERENCES [dbo].[Tienda] ([Id])
GO
ALTER TABLE [dbo].[RelArticuloTienda] CHECK CONSTRAINT [FK__RelArticu__Tiend__5441852A]
GO
ALTER TABLE [dbo].[RelClienteArticulo]  WITH CHECK ADD FOREIGN KEY([ClienteId])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[RelClienteArticulo]  WITH CHECK ADD FOREIGN KEY([ClienteId])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[RelClienteArticulo]  WITH CHECK ADD  CONSTRAINT [FK_RelClienteArticulo_Articulo] FOREIGN KEY([ArticuloId])
REFERENCES [dbo].[Articulo] ([Id])
GO
ALTER TABLE [dbo].[RelClienteArticulo] CHECK CONSTRAINT [FK_RelClienteArticulo_Articulo]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Cliente] FOREIGN KEY([ClienteId])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Cliente]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Rol] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Rol]
GO
/****** Object:  StoredProcedure [dbo].[SpArticuloDelete]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpArticuloDelete]
    @ArticuloId UNIQUEIDENTIFIER
AS
BEGIN

UPDATE [dbo].[Articulo]
   SET [Activo] = 0
  WHERE Id = @ArticuloId

  
END
GO
/****** Object:  StoredProcedure [dbo].[SpArticuloEdit]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpArticuloEdit] (
    @ArticuloId UNIQUEIDENTIFIER,
    @Codigo VARCHAR(255),
    @Descripcion VARCHAR(MAX),
    @Precio FLOAT,
    @Image VARCHAR(MAX)
)
AS
BEGIN
    UPDATE Articulo 
    SET Codigo = @Codigo,
        Descripcion = @Descripcion,
        Precio = @Precio,
        Image = @Image
    WHERE Id = @ArticuloId
END;
GO
/****** Object:  StoredProcedure [dbo].[SpArticuloInsert]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpArticuloInsert] (
    @Codigo VARCHAR(255),
    @Descripcion VARCHAR(MAX),
    @Precio FLOAT,
    @Image VARCHAR(MAX)
)
AS
BEGIN
    INSERT INTO Articulo (Id, Codigo, Descripcion, Precio, Image)
    VALUES (NEWID(), @Codigo, @Descripcion, @Precio, @Image)
END;
GO
/****** Object:  StoredProcedure [dbo].[SpArticulosEdit]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpArticulosEdit]
AS
BEGIN
    SELECT Id, Codigo, Descripcion, Precio, Image FROM Articulo
END;
GO
/****** Object:  StoredProcedure [dbo].[SpArticulosGetAll]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpArticulosGetAll]
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        Id,
        Codigo,
        Descripcion,
        Precio,
        Image,
		Activo
    FROM 
        Articulo

		wHERE Activo = 1
END;
GO
/****** Object:  StoredProcedure [dbo].[SpArticulosGetAllPaginate]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpArticulosGetAllPaginate]
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT;

    SET @Offset = (@PageNumber - 1) * @PageSize;

    DECLARE @TotalCount INT;

    SELECT @TotalCount = COUNT(*) FROM Articulo;
	
    SELECT @TotalCount AS TotalCount;
    SELECT *
    FROM Articulo
    ORDER BY Id
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;

END;
GO
/****** Object:  StoredProcedure [dbo].[SpArticulosGetById]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpArticulosGetById]
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT Id, Codigo, Descripcion, Precio, T1.Image AS image
    FROM Articulo AS T1
    WHERE Id = @Id;
END;
GO
/****** Object:  StoredProcedure [dbo].[SpClienteDelete]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpClienteDelete]
    @ClientId UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM cliente
    WHERE Id = @ClientId
END
GO
/****** Object:  StoredProcedure [dbo].[SpClienteEdit]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpClienteEdit] (
    @ClienteId UNIQUEIDENTIFIER,
    @Nombre VARCHAR(255),
    @Apellidos VARCHAR(255),
    @Direccion VARCHAR(MAX)
)
AS
BEGIN
    UPDATE Cliente 
    SET Nombre = @Nombre,
        Apellidos = @Apellidos,
        Direccion = @Direccion
    WHERE Id = @ClienteId
END;
GO
/****** Object:  StoredProcedure [dbo].[SpClienteGetAllPaginate]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpClienteGetAllPaginate]
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalCount INT;

    SELECT @TotalCount = COUNT(*) FROM dbo.Cliente;

    SELECT *
    FROM (
        SELECT *, ROW_NUMBER() OVER (ORDER BY Id) AS RowNum
        FROM dbo.Cliente
    ) AS RowConstrainedResult
    WHERE RowNum > (@PageNumber - 1) * @PageSize
    AND RowNum <= @PageNumber * @PageSize;

    -- Devolver el recuento total de registros
    SELECT @TotalCount AS TotalCount;
END;
GO
/****** Object:  StoredProcedure [dbo].[SpClienteGetById]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpClienteGetById]
    @ClientId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT [Id]
		  ,[Nombre]
		  ,[Apellidos]
		  ,[Direccion]
	  FROM [dbo].[Cliente]

	 WHERE Id = @ClientId;
END
GO
/****** Object:  StoredProcedure [dbo].[SpClienteInsert]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpClienteInsert] (
    @Nombre VARCHAR(255),
    @Apellidos VARCHAR(255),
    @Direccion VARCHAR(MAX)
)
AS
BEGIN
    INSERT INTO Cliente (Id, Nombre, Apellidos, Direccion)
    VALUES (NEWID(), @Nombre, @Apellidos, @Direccion)
END;
GO
/****** Object:  StoredProcedure [dbo].[SpClientesGetAll]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpClientesGetAll]
AS
BEGIN
    SELECT Id, Nombre, Apellidos, Direccion FROM Cliente
END;
GO
/****** Object:  StoredProcedure [dbo].[SpGetAllUsersWithDetails]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetAllUsersWithDetails]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT u.*, r.rol AS Rol, CONCAT(c.Nombre,' ',c.Apellidos) AS Cliente
    FROM Usuario u
    LEFT JOIN Role r ON u.RoleId = r.Id
    LEFT JOIN Cliente c ON u.ClienteId = c.Id;
END
GO
/****** Object:  StoredProcedure [dbo].[SpRelArticuloTiendaDeleteByTiendaId]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpRelArticuloTiendaDeleteByTiendaId]
    @TiendaId UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM RelArticuloTienda
    WHERE TiendaId = @TiendaId;
END
GO
/****** Object:  StoredProcedure [dbo].[SpRelArticuloTiendaInsert]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpRelArticuloTiendaInsert]
    @ArticuloId UNIQUEIDENTIFIER,
    @TiendaId UNIQUEIDENTIFIER,
    @Cantidad INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO RelArticuloTienda (Id, ArticuloId, TiendaId, Cantidad, Fecha)
    VALUES (NEWID(), @ArticuloId, @TiendaId, @Cantidad, getdate());
END;
GO
/****** Object:  StoredProcedure [dbo].[SpRelClienteArticuloDelete]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SpRelClienteArticuloDelete]
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM RelClienteArticulo WHERE Id = @Id;
END
GO
/****** Object:  StoredProcedure [dbo].[SpRelClienteArticuloGetAll]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SpRelClienteArticuloGetAll]
AS
BEGIN
    SET NOCOUNT ON;
	SELECT 
        RCA.*,
        CONCAT(C.Nombre,' ', C.Apellidos) AS Cliente,
        A.Descripcion AS Articulo

    FROM 
        RelClienteArticulo RCA
    INNER JOIN 
        Cliente C ON RCA.ClienteId = C.Id
    INNER JOIN 
        Articulo A ON RCA.ArticuloId = A.Id;
END
GO
/****** Object:  StoredProcedure [dbo].[SpRelClienteArticuloGetAllPaginate]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- SP para obtener todos los registros de la tabla RelClienteArticulo con paginación
CREATE PROCEDURE [dbo].[SpRelClienteArticuloGetAllPaginate]
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalCount INT;
    SELECT @TotalCount = COUNT(*) FROM RelClienteArticulo;

    SELECT 
        RCA.*,
        CONCAT(C.Nombre, ' ', C.Apellidos) AS Cliente,
        A.Descripcion AS Articulo
    FROM 
        RelClienteArticulo RCA
    INNER JOIN 
        Cliente C ON RCA.ClienteId = C.Id
    INNER JOIN 
        Articulo A ON RCA.ArticuloId = A.Id
    ORDER BY 
        RCA.Id -- Puedes cambiar el ordenamiento según tus necesidades
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;

    SELECT @TotalCount AS TotalCount;
END;
GO
/****** Object:  StoredProcedure [dbo].[SpRelClienteArticuloGetById]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- SP para obtener un registro de la tabla RelClienteArticulo por su ID
CREATE PROCEDURE [dbo].[SpRelClienteArticuloGetById]
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM RelClienteArticulo WHERE Id = @Id;
END
GO
/****** Object:  StoredProcedure [dbo].[SpRelClienteArticuloInsert]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- SP para insertar un registro en la tabla RelClienteArticulo
CREATE PROCEDURE [dbo].[SpRelClienteArticuloInsert]
    @ClienteId UNIQUEIDENTIFIER,
    @ArticuloId UNIQUEIDENTIFIER,
    @Cantidad INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO RelClienteArticulo (Id, ClienteId, ArticuloId, Cantidad, Fecha)
    VALUES (NEWID(), @ClienteId, @ArticuloId, @Cantidad, GETDATE());
END
GO
/****** Object:  StoredProcedure [dbo].[SpRolesGetAll]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Script para el stored procedure (SP) que selecciona todos los roles
CREATE PROCEDURE [dbo].[SpRolesGetAll]
AS
BEGIN
    SET NOCOUNT ON;

    -- Seleccionar todos los roles de la tabla Roles
    SELECT Id, Rol FROM Role;
END;
GO
/****** Object:  StoredProcedure [dbo].[SpTiendaDelete]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpTiendaDelete]
    @StoreId UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM Tienda
    WHERE Id = @StoreId
END
GO
/****** Object:  StoredProcedure [dbo].[SpTiendaEdit]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpTiendaEdit] (
    @TiendaId UNIQUEIDENTIFIER,
    @Sucursal VARCHAR(255),
    @Direccion VARCHAR(MAX),
    @Telefono INT
)
AS
BEGIN
    UPDATE Tienda 
    SET Sucursal = @Sucursal,
        Direccion = @Direccion,
        Telefono = @Telefono
    WHERE Id = @TiendaId
END;
GO
/****** Object:  StoredProcedure [dbo].[SpTiendaGetAllPaginate]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpTiendaGetAllPaginate]
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Variable para almacenar el recuento total de registros
    DECLARE @TotalCount INT;

    -- Obtener el recuento total de registros
    SELECT @TotalCount = COUNT(*) FROM dbo.Tienda;

    -- Obtener los registros paginados
    SELECT *
    FROM (
        SELECT *, ROW_NUMBER() OVER (ORDER BY Id) AS RowNum
        FROM dbo.Tienda
    ) AS RowConstrainedResult
    WHERE RowNum > (@PageNumber - 1) * @PageSize
    AND RowNum <= @PageNumber * @PageSize;

    -- Devolver el recuento total de registros
    SELECT @TotalCount AS TotalCount;
END;
GO
/****** Object:  StoredProcedure [dbo].[SpTiendaGetById]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpTiendaGetById]
    @TiendaId UNIQUEIDENTIFIER
AS
BEGIN
   SELECT
    T.Id ,
    T.Sucursal,
    T.Direccion,
    T.Telefono,
    A.Id AS ArticuloId,
    A.[Codigo],
	A.[Descripcion],
    A.[Precio],
    A.[Image],
	RAT.Cantidad
FROM
    Tienda T
LEFT JOIN
    RelArticuloTienda RAT ON T.Id = RAT.TiendaId
LEFT JOIN
    Articulo A ON RAT.ArticuloId = A.Id
WHERE
    T.Id = @TiendaId OR @TiendaId IS NULL
ORDER BY
    A.Id;

END

GO
/****** Object:  StoredProcedure [dbo].[SpTiendaInsert]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpTiendaInsert] (
    @Sucursal VARCHAR(255),
    @Direccion VARCHAR(MAX),
    @Telefono INT
)
AS
BEGIN
    INSERT INTO Tienda (Id, Sucursal, Direccion, Telefono)
    VALUES (NEWID(), @Sucursal, @Direccion, @Telefono)
END;
GO
/****** Object:  StoredProcedure [dbo].[SpTiendaInsertReturnId]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpTiendaInsertReturnId]
    @Sucursal NVARCHAR(100),
    @Direccion NVARCHAR(100),
    @Telefono INT,
    @TiendaId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
   -- Insertar la tienda y obtener su ID generado automáticamente
    INSERT INTO Tienda (Id, Sucursal, Direccion, Telefono)
    VALUES (@TiendaId,@Sucursal, @Direccion, @Telefono);

END
GO
/****** Object:  StoredProcedure [dbo].[SpTiendasGetAll]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpTiendasGetAll]
AS
BEGIN
    SELECT Id, Sucursal, Direccion, Telefono FROM Tienda
END;
GO
/****** Object:  StoredProcedure [dbo].[SpUsuarioDelete]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUsuarioDelete]
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM Usuario WHERE Id = @Id;
END
GO
/****** Object:  StoredProcedure [dbo].[SpUsuarioGetAll]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUsuarioGetAll]
AS
BEGIN
    SELECT * FROM Usuario;
END
GO
/****** Object:  StoredProcedure [dbo].[SpUsuarioGetAllPaginate]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUsuarioGetAllPaginate]
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalCount INT;

    SELECT @TotalCount = COUNT(*) FROM dbo.Usuario;

   SELECT U.*, R.Rol, CONCAT(C.Nombre,' ',C.Apellidos )AS Cliente
    FROM (
        SELECT *, ROW_NUMBER() OVER (ORDER BY Id) AS RowNum
        FROM dbo.Usuario
    ) AS U
    INNER JOIN dbo.Role R ON U.RoleId = R.Id
    LEFT JOIN dbo.Cliente C ON U.ClienteId = C.Id
    WHERE U.RowNum > (@PageNumber - 1) * @PageSize
    AND U.RowNum <= @PageNumber * @PageSize;

    SELECT @TotalCount AS TotalCount;
END;
GO
/****** Object:  StoredProcedure [dbo].[SpUsuarioGetById]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUsuarioGetById]
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SELECT * FROM Usuario WHERE Id = @Id;
END
GO
/****** Object:  StoredProcedure [dbo].[SpUsuarioInsert]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUsuarioInsert]
    @NombreUsuario VARCHAR(50),
    @Correo VARCHAR(100),
    @ContraseñaHash VARCHAR(100),
    @Salt varbinary(50),
    @ClienteId UNIQUEIDENTIFIER,
    @RoleId UNIQUEIDENTIFIER
AS
BEGIN
    INSERT INTO Usuario (NombreUsuario, Correo, ContraseñaHash, Salt, ClienteId, RoleId)
    VALUES (@NombreUsuario, @Correo, @ContraseñaHash, @Salt, @ClienteId, @RoleId);
END
GO
/****** Object:  StoredProcedure [dbo].[SpUsuarioLogin]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUsuarioLogin]
    @Correo VARCHAR(100),
    @Password VARCHAR(100) OUTPUT,
    @RoleId UNIQUEIDENTIFIER OUTPUT,
    @ClientId UNIQUEIDENTIFIER OUTPUT,
    @Salt varbinary(50) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @StoredPassword VARCHAR(100);

    SELECT @RoleId = RoleId, 
           @StoredPassword = ContraseñaHash, 
           @Salt = Salt,
		   @ClientId = ClienteId
    FROM Usuario
    WHERE Correo = @Correo;

    -- Asignar el valor del password almacenado
    SET @Password = @StoredPassword;

END
GO
/****** Object:  StoredProcedure [dbo].[SpUsuarioUpdate]    Script Date: 05/03/2024 02:13:03 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUsuarioUpdate]
    @Id UNIQUEIDENTIFIER,
    @NombreUsuario VARCHAR(50),
    @Correo VARCHAR(100),
    @ClienteId UNIQUEIDENTIFIER,
    @RoleId UNIQUEIDENTIFIER
AS
BEGIN
    UPDATE Usuario SET
        NombreUsuario = @NombreUsuario,
        Correo = @Correo,
        ClienteId = @ClienteId,
        RoleId = @RoleId
    WHERE Id = @Id;
END
GO
USE [master]
GO
ALTER DATABASE [pt] SET  READ_WRITE 
GO
