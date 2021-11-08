create table TipoUsuario(
    id_tipousuario int not null primary key,
    tipo varchar(15)
);
create sequence id_tipousuario start with 1;

create table Usuario(
    id_usuario int not null primary key,
    username varchar(40),
    password varchar(15),
    inicio date,
    final date,
    activo varchar(1),
    id_tipousuario int not null,
    constraint fk_tipo 
        foreign key (id_tipousuario) 
        references TipoUsuario(id_tipousuario),
    unique(username, password)
);
create sequence id_usuario start with 1;

create table Chat(
    id_chat int not null primary key,
    usuario1 int,
    usuario2 int,
    constraint tk_usuario1 foreign key (usuario1) references Usuario(id_usuario),
    constraint tk_usuario2 foreign key (usuario2) references Usuario(id_usuario),
    unique(usuario1, usuario2)
);
create sequence id_chat start with 1;

create table Mensaje(
    id_mensaje int not null primary key,
    contenido varchar(150),
    id_chat int,
    fecha date,
    id_usuario int,
    constraint tk_chat foreign key (id_chat) references Chat(id_chat),
    constraint tk_usaurio foreign key (id_usuario) references Usuario(id_usuario)
);
create sequence id_mensaje start with 1;

create table Aplicante(
    cui int not null primary key,
    nombre varchar(150),
    apellido varchar(150),
    correo varchar(150),
    direccion varchar(150),
    cv varchar(150)
);

create table Formato(
    id_formato int not null primary key,
    nombre varchar(150) unique
);
create sequence id_formato start with 1;

create table Requisito(
    id_requisito int not null primary key,
    nombre varchar(150),
    tamano int,
    obligatorio int,
    unique(nombre,tamano,obligatorio)
);
create sequence id_requisito start with 1;

create table RequisitoFormato(
    id_requisito_formato int not null primary key,
    id_requisito int not null,
    id_formato int not null,
    constraint tk_requisito foreign key (id_requisito) references Requisito(id_requisito),
    constraint tk_formato foreign key (id_formato) references Formato(id_formato)
);
create sequence id_requisito_formato start with 1;

create table Categoria(
    id_categoria int not null primary key,
    nombre varchar(150) unique
);
create sequence id_categoria start with 1;

create table Puesto(
    id_puesto int not null primary key,
    nombre varchar(150),
    salario float,
    unique(nombre,salario)
);
create sequence id_puesto start with 1;

create table PuestoCategoria(
    id_puesto_categoria int not null primary key,
    id_puesto int not null,
    id_categoria int not null,
    constraint tk_puesto foreign key (id_puesto) references Puesto(id_puesto),
    constraint tk_categoria foreign key (id_categoria) references Categoria(id_categoria),
    unique(id_puesto, id_categoria)
);
create sequence id_puesto_categoria start with 1;

create table PuestoRequisito(
    id_puesto_requisito int not null primary key,
    id_puesto int not null,
    id_requisito int not null,
    constraint tk_puestopr foreign key (id_puesto) references Puesto(id_puesto),
    constraint tk_requisitopr foreign key (id_requisito) references Requisito(id_requisito),
    unique(id_puesto,id_requisito)
);
create sequence id_puesto_requisito start with 1;

create table Departamento(
    id_departamento int not null primary key,
    nombre varchar(150),
    capital_total float, 
    coordinador int,
    constraint tk_coordinadordep foreign key (coordinador) references Usuario(id_usuario),
    unique(nombre, capital_total)
);
create sequence id_departamento start with 1;

create table DepartamentoPadreHijo(
    id_departamento_padre_hijo int not null primary key,
    padre int,
    hijo int,
    constraint padre foreign key (padre) references Departamento(id_departamento),
    constraint hijo foreign key (hijo) references Departamento(id_departamento),
    unique(padre, hijo)
);
create sequence id_departamento_padre_hijo start with 1;

create table DepartamentoPuesto(
    id_departamento_puesto int not null primary key,
    id_departamento int not null,
    id_puesto int not null,
    constraint tk_departamentodp foreign key (id_departamento) references Departamento(id_departamento),
    constraint tk_puestodp foreign key (id_puesto) references Puesto(id_puesto),
    unique(id_departamento, id_puesto)
);
create sequence id_departamento_puesto start with 1;

create table DepartamentoUsuario(
    id_departamento_usuario int not null primary key,
    id_usuario int unique,
    id_departamento int,
    revisor varchar(1),
    constraint usuario_depa foreign key (id_usuario) references Usuario(id_usuario),
    constraint depa_usuario foreign key (id_departamento) references Departamento(id_departamento),
    unique(id_usuario, id_departamento)  
);
create sequence id_departamento_usuario start with 1;

insert into tipousuario values (id_tipousuario.nextval, 'administrador');
insert into tipousuario values (id_tipousuario.nextval, 'aplicante');
insert into tipousuario values (id_tipousuario.nextval, 'coordinador');
insert into tipousuario values (id_tipousuario.nextval, 'guest');
insert into tipousuario values (id_tipousuario.nextval, 'revisor');

insert into usuario values (id_usuario.nextval, 'admin', 'admin',CURRENT_DATE,CURRENT_DATE,'T',1) ;

insert into aplicante values (3004731760101, 'Juan', 'Rojas', 'jprojaschinchilla@gmail.com', '33 av A 20-31', 'https://lorempixel.com/1920/1080/');
insert into aplicante values (3004731760102, 'Pablo', 'Chinchilla', 'rojaschjuanpablo@gmail.com', 'tu corazon','https://lorempixel.com/1920/1080/');

select Puesto.nombre as puesto, Departamento.nombre as departamento, Puesto.salario as salario from DepartamentoPuesto
inner join Departamento on Departamento.id_departamento = DepartamentoPuesto.id_departamento
inner join Puesto on Puesto.id_puesto = DepartamentoPuesto.id_puesto;


select Puesto.nombre as puesto, Departamento.nombre as departamento, Puesto.salario as salario from DepartamentoPuesto
    inner join Departamento on Departamento.id_departamento = DepartamentoPuesto.id_departamento    
    inner join Puesto on Puesto.id_puesto = DepartamentoPuesto.id_puesto
    where Puesto.nombre like '%oor%';

describe usuario;

select username,password,inicio,final,activo from usuario
inner join DepartamentoUsuario on DepartamentoUsuario.id_usuario = Usuario.id_usuario
where DepartamentoUsuario.id_departamento = 41;
-- insert into departamento (id_departamento, nombre, capital_total) values (id_departamento.nextval, 'Prueba', 5000);
-- TODO tengo que arreglar las llaves primarias para que jalen con nombres y no numeros
-- TODO tengo que arreglar las llaves foraneas para que jalen los nombres