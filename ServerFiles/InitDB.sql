
-- Usuarios, Roles y Permisos 


create table if not exists Roles(
    ID_rol int not null,
    nombre varchar(30) unique not null,
    productos ENUM('Ninguno', 'Leer', 'Escribir', 'Actualizar','Eliminar') not null,
    clasificacion ENUM('Ninguno', 'Leer', 'Escribir', 'Actualizar','Eliminar') not null,
    lotes ENUM('Ninguno', 'Leer', 'Escribir', 'Actualizar','Eliminar') not null,
    reportes ENUM('Ninguno', 'Leer', 'Escribir', 'Actualizar','Eliminar') not null,
    administrador ENUM('No', 'Si') not null,
    borrado boolean not null default false,
    constraint PK_rol primary key (ID_rol)
) ENGINE = InnoDB;


create table if not exists Usuarios (
    ID_usuario int not null AUTO_INCREMENT,
    user varchar(30) unique not null,
    pass varchar(70) not null,
    name varchar(30) not null,
    ID_rol int not null,
    borrado boolean not null default false,
    constraint PK_usr primary key (ID_usuario),
    constraint FK_usr_rol foreign key (ID_rol) references Roles(ID_rol)
) ENGINE = InnoDB;


-- ELEMENTOS DEL SKU

create table if not exists Categoria (
	ID_categoria int(3) not null ,
    nombre varchar(30) unique not null,
    borrado boolean not null default false,
    constraint PK_cat primary key (ID_categoria)
) ENGINE = InnoDB;

create table if not exists Subcategoria (
	ID_subcategoria int(3) unsigned not null,
    nombre varchar(30) unique not null,
    ID_categoria int(3) not null,
    borrado boolean not null default false,
    constraint PK_sub primary key ( ID_subcategoria ),
    constraint FK_sub_cat foreign key (ID_categoria) references Categoria(ID_categoria)
) ENGINE = InnoDB;

create table if not exists Marca (
	ID_marca int(3) unsigned not null,
    nombre varchar(30) unique not null,
    borrado boolean not null default false,
    constraint PK_mar primary key (ID_marca)
) ENGINE = InnoDB;


-- PRODUCTOS, DESCUENTOS POR PRODUCTO, PROVEEDORES

create table if not exists Unidades (
	ID_unidad int unsigned not null ,
    nombre varchar(10) unique not null,
    constraint PK_alm primary key (ID_unidad)
) ENGINE = InnoDB;

create table if not exists Producto (
	SKU char(11) not null,
    ID_subcategoria int(3) unsigned not null,
    ID_marca int(3) unsigned not null,
    nombre varchar(30) unique not null,
    descripcion text,
    margen_ganancia numeric(5,2),
    porcentaje_impuestos numeric(5,2),
    borrado boolean not null default false,
    vigilar boolean default 0,
    perecedero boolean default 0,
    minimo_stock numeric(15,2) unsigned not null,
    dias_antes_vencimiento int(5) unsigned default 0,
    constraint PK_sku primary key (SKU),
    constraint FK_sku_sub foreign key (ID_subcategoria) references Subcategoria(ID_subcategoria),
    constraint FK_sku_mar foreign key (ID_marca) references Marca(ID_marca)
) ENGINE = InnoDB;

create table if not exists Proveedor (
	ID_proveedor int unsigned not null ,
    nombre varchar(30) not null,
    borrado boolean not null default false,
    constraint PK_prv primary key (ID_proveedor)
) ENGINE = InnoDB;


-- LOTES, ALMACEN, CADUCIDAD

create table if not exists Almacen (
	ID_almacen int unsigned not null ,
    nombre varchar(30) unique not null,
    borrado boolean not null default false,
    constraint PK_alm primary key (ID_almacen)
) ENGINE = InnoDB;

create table if not exists Lotes (
	ID_lotes int unsigned not null ,
    SKU char(12) not null,
    cantidad numeric (10,2) not null,
    fecha_ingreso date not null,
    costo numeric (15,2) not null,
    ID_almacen int unsigned not null,
    pasillo varchar(20),
    estante varchar(20),
    fecha_caducidad date,
    marcarSalida boolean default false,
    borrado boolean not null default false,
    constraint FK_lot_pro foreign key (SKU) references Producto(SKU) on update cascade,
    constraint FK_lot_alm foreign key (ID_almacen) references Almacen(ID_almacen),
    constraint PK_lot primary key (ID_lotes) 
) ENGINE = InnoDB;



create table if not exists Movimientos (
    ID_movimiento int unsigned not null AUTO_INCREMENT,
	user varchar(30) not null,
    ID_lotes int unsigned not null ,
    SKU char(12) not null,
    tipo ENUM('Borrado', 'Sacado', 'Ingresado') not null,
    fecha date not null,
    cantidad numeric (10,2) not null,
    borrado boolean default 0,
    constraint PK_cli primary key (ID_movimiento),
    constraint FK_mov_pro foreign key (ID_lotes) references Lotes(ID_lotes) on update cascade,
    constraint FK_mov_lot foreign key (SKU) references Producto(SKU) on update cascade
) ENGINE = InnoDB;

-- VENTAS, CLIENTES, DESCUENTO GENERAL

create table if not exists Cliente (
    ID_cliente int unsigned not null ,
	nombre varchar(50) not null,
    telefono int(12),
    direccion varchar(100) not null,
    borrado boolean not null default false,
    constraint PK_cli primary key (ID_cliente)
) ENGINE = InnoDB;


SET SQL_SAFE_UPDATES = 0;
