CREATE TABLE [Empleado](
    [Id] [uniqueidentifier] PRIMARY KEY,
    [Nombre] [nvarchar](128) NOT NULL,
    [Edad] [tinyint] NOT NULL,
    [Foto] [nvarchar](max) NULL
)
