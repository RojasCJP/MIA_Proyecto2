create table TipoUsuario(
    id_tipousuario int not null primary key,
    tipo varchar(15)
);
create sequence id_tipousuario start with 1;

create table Usuario(
    id_usuario int not null primary key,
    username varchar(15),
    password varchar(15),
    inicio date,
    final date,
    activo varchar(1),
    id_tipousuario int not null,
    constraint fk_tipo 
        foreign key (id_tipousuario) 
        references TipoUsuario(id_tipousuario)
);
create sequence id_usuario start with 1;

create table Chat(
    id_chat int not null primary key,
    usuario1 int,
    usuario2 int,
    constraint tk_usuario1 foreign key (usuario1) references Usuario(id_usuario),
    constraint tk_usuario2 foreign key (usuario2) references Usuario(id_usuario)
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
    nombre varchar(15),
    apellido varchar(15),
    correo varchar(30),
    direccion varchar(100)
);

insert into tipousuario values (id_tipousuario.nextval, 'administrador');
insert into tipousuario values (id_tipousuario.nextval, 'aplicante');
insert into tipousuario values (id_tipousuario.nextval, 'coordinador');
insert into tipousuario values (id_tipousuario.nextval, 'guest');
insert into tipousuario values (id_tipousuario.nextval, 'revisor');

insert into usuario values (id_usuario.nextval, 'admin', 'admin', 1);
insert into usuario values (id_usuario.nextval, 'aplicante', 'aplicante', 2);
insert into usuario values (id_usuario.nextval, 'coordinador', 'coordinador', 3);
insert into usuario values (id_usuario.nextval, 'guest', 'guest', 4);
insert into usuario values (id_usuario.nextval, 'revisor', 'revisor', 5);

insert into aplicante values (1234, 'juan', 'rojas', 'jprojaschinchilla@gmail.com', '33 av A 20-31');