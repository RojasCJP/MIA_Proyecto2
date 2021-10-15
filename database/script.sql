create table TipoUsuario(
    id_tipousuario int not null primary key,
    tipo varchar(15)
);
create sequence id_tipousuario start with 1;

create table Usuario(
    id_usuario int not null primary key,
    username varchar(15),
    password varchar(15),
    id_tipousuario int not null,
    constraint fk_tipo 
        foreign key (id_tipousuario) 
        references TipoUsuario(id_tipousuario)
);
create sequence id_usuario start with 1;


insert into tipousuario values (id_tipousuario.nextval, 'administrador');
insert into tipousuario values (id_tipousuario.nextval, 'aplicante');
insert into tipousuario values (id_tipousuario.nextval, 'coordinador');
insert into tipousuario values (id_tipousuario.nextval, 'guest');
insert into tipousuario values (id_tipousuario.nextval, 'revisor');

insert into usuario values (id_usuario.nextval, 'admin', 'admin', 1);

