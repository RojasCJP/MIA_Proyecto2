import { Request, Response } from "express";
import { connection } from "../database";
import { Mail } from "../mailer/config";

interface Result {
  status: number;
  data: Recuperacion[];
}
interface Recuperacion {
  CUENTA: number;
}

class IndexController {
  public async index(req: Request, res: Response) {
    res.json({ text: "server levantado desde node" });
  }
  public async user(req: Request, res: Response) {
    var username: string = req.body.username;
    var pass: string = req.body.password;
    var consulta1: string =
      "select count(password) as cuenta from usuario where username = '" +
      username +
      "' and password = '" +
      pass +
      "'";
    var consulta2: string =
      "select id_tipousuario as tipo, id_usuario as id from usuario where username = '" +
      username +
      "' and password = '" +
      pass +
      "'";
    var result: any = await connection.connect(consulta1);
    var tipo: any = await connection.connect(consulta2);
    var consulta3: string = "";
    if (tipo.data.length > 0) {
      consulta3 =
        "select id_departamento as departamento from departamentousuario where id_usuario = " +
        tipo.data[0].ID;
    }
    var dep: any = await connection.connect(consulta3);
    var departamentoaux = null;
    if (dep.data != undefined) {
      if (dep.data[0] != undefined) {
        departamentoaux = dep.data[0].DEPARTAMENTO;
      }
    }
    console.log(departamentoaux);
    if (tipo.data.length == 0) {
      tipo.data = [{ TIPO: 0 }];
    }
    if (result.data[0].CUENTA == 1) {
      res.json({
        entrada: true,
        tipo: tipo.data[0].TIPO,
        departament: departamentoaux,
      });
    } else {
      res.json({
        entrada: false,
        tipo: tipo.data[0].TIPO,
        departament: departamentoaux,
      });
    }
  }

  public async nuevoAplicante(req: Request, res: Response) {
    var cui = req.body.cui;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var correo = req.body.correo;
    var direccion = req.body.direccion;
    var cv = req.body.cv;
    const insert =
      "insert into aplicante values (" +
      cui +
      ", '" +
      nombre +
      "', '" +
      apellido +
      "', '" +
      correo +
      "', '" +
      direccion +
      "', '" +
      cv +
      "')";
    var res1 = await connection.connect(insert);
    var mail = new Mail(nombre, apellido, correo);
    mail.sendMesage();
    console.log(res1);
    res.json({ status: res1.status });
  }

  public async updateAplicante(req: Request, res: Response) {
    var cui = req.body.cui;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var correo = req.body.correo;
    var direccion = req.body.direccion;
    var cv = req.body.cv;
    const update =
      "update aplicante set nombre='" +
      nombre +
      "',apellido='" +
      apellido +
      "',correo='" +
      correo +
      "',direccion='" +
      direccion +
      "',cv='" +
      cv +
      "' where cui = " +
      cui;
    var res1 = await connection.connect(update);
    res.json({ status: res1.status });
  }

  public async puestos(req: Request, res: Response) {
    var consulta =
      "select Puesto.nombre as puesto, Departamento.nombre as departamento, Puesto.salario as salario from DepartamentoPuesto    inner join Departamento on Departamento.id_departamento = DepartamentoPuesto.id_departamento    inner join Puesto on Puesto.id_puesto = DepartamentoPuesto.id_puesto";
    var consultaAplyers = await connection.connect(consulta);
    res.json(consultaAplyers);
  }

  public async searchPuestos(req: Request, res: Response) {
    var consulta =
      `select Puesto.nombre as puesto, Departamento.nombre as departamento, Puesto.salario as salario from DepartamentoPuesto
    inner join Departamento on Departamento.id_departamento = DepartamentoPuesto.id_departamento    
    inner join Puesto on Puesto.id_puesto = DepartamentoPuesto.id_puesto
    where Puesto.nombre like '%` +
      req.body.puesto +
      `%'`;
    var consultaPuestos = await connection.connect(consulta);
    res.json(consultaPuestos);
  }

  public async allUsers(req: Request, res: Response) {
    var consulta = "select * from usuario";
    var consultUsers = await connection.connect(consulta);
    res.json(consultUsers);
  }

  public async allDep(req: Request, res: Response) {
    var consulta =
      "select id_departamento as idep,nombre, capital_total as capital, Usuario.username from departamento left outer join Usuario on Usuario.id_usuario = Departamento.coordinador";
    var consultDep = await connection.connect(consulta);
    res.json(consultDep);
  }

  public async runDrops(req: Request, res: Response) {
    var consulta = `drop sequence id_departamento_padre_hijo`;
    var consult = await connection.connect(consulta);
    consulta = `drop sequence id_departamento_usuario`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_departamento_puesto`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_departamento`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_puesto_requisito`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_puesto_categoria`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_puesto`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_categoria`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_requisito_formato`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_requisito`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_formato`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_mensaje`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_chat`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_usuario`;
    consult = await connection.connect(consulta);
    consulta = `drop sequence id_tipousuario`;
    consult = await connection.connect(consulta);
    consulta = `drop table DepartamentoPadreHijo`;
    consult = await connection.connect(consulta);
    consulta = `drop table DepartamentoUsuario`;
    consult = await connection.connect(consulta);
    consulta = `drop table DepartamentoPuesto`;
    consult = await connection.connect(consulta);
    consulta = `drop table Departamento`;
    consult = await connection.connect(consulta);
    consulta = `drop table PuestoRequisito`;
    consult = await connection.connect(consulta);
    consulta = `drop table PuestoCategoria`;
    consult = await connection.connect(consulta);
    consulta = `drop table Puesto`;
    consult = await connection.connect(consulta);
    consulta = `drop table Categoria`;
    consult = await connection.connect(consulta);
    consulta = `drop table RequisitoFormato`;
    consult = await connection.connect(consulta);
    consulta = `drop table Requisito`;
    consult = await connection.connect(consulta);
    consulta = `drop table Formato`;
    consult = await connection.connect(consulta);
    consulta = `drop table Aplicante`;
    consult = await connection.connect(consulta);
    consulta = `drop table Mensaje`;
    consult = await connection.connect(consulta);
    consulta = `drop table Chat`;
    consult = await connection.connect(consulta);
    consulta = `drop table Usuario`;
    consult = await connection.connect(consulta);
    consulta = `drop table TipoUsuario`;
    consult = await connection.connect(consulta);
    res.json(consult);
  }

  public async runScript(req: Request, res: Response) {
    var consult = await connection.connect(
      `create table TipoUsuario(      id_tipousuario int not null primary key,      tipo varchar(15)  )`
    );
    consult = await connection.connect(
      `create sequence id_tipousuario start with 1`
    );
    consult = await connection.connect(
      `create table Usuario(      id_usuario int not null primary key,      username varchar(40),      password varchar(15),      inicio date,      final date,      activo varchar(1),      id_tipousuario int not null,      constraint fk_tipo           foreign key (id_tipousuario)           references TipoUsuario(id_tipousuario),      unique(username, password)  )`
    );
    consult = await connection.connect(
      `create sequence id_usuario start with 1`
    );
    consult = await connection.connect(
      `create table Chat(        id_chat int not null primary key,        usuario1 int,        usuario2 int,        constraint tk_usuario1 foreign key (usuario1) references Usuario(id_usuario),        constraint tk_usuario2 foreign key (usuario2) references Usuario(id_usuario),        unique(usuario1, usuario2)    )`
    );
    consult = await connection.connect(`create sequence id_chat start with 1`);
    consult = await connection.connect(
      `create table Mensaje(      id_mensaje int not null primary key,      contenido varchar(150),      id_chat int,      fecha date,      id_usuario int,      constraint tk_chat foreign key (id_chat) references Chat(id_chat),      constraint tk_usaurio foreign key (id_usuario) references Usuario(id_usuario)  )`
    );
    consult = await connection.connect(
      `create sequence id_mensaje start with 1`
    );
    consult = await connection.connect(
      `create table Aplicante(      cui int not null primary key,      nombre varchar(150),      apellido varchar(150),      correo varchar(150),      direccion varchar(150),      cv varchar(150)  )`
    );
    consult = await connection.connect(
      `create table Formato(      id_formato int not null primary key,      nombre varchar(150) unique  )`
    );
    consult = await connection.connect(
      `create sequence id_formato start with 1`
    );
    consult = await connection.connect(
      `create table Requisito(      id_requisito int not null primary key,      nombre varchar(150),      tamano int,      obligatorio int,      unique(nombre,tamano,obligatorio)  )`
    );
    consult = await connection.connect(
      `create sequence id_requisito start with 1`
    );
    consult = await connection.connect(
      `create table RequisitoFormato(      id_requisito_formato int not null primary key,      id_requisito int not null,      id_formato int not null,      constraint tk_requisito foreign key (id_requisito) references Requisito(id_requisito),      constraint tk_formato foreign key (id_formato) references Formato(id_formato)  )`
    );
    consult = await connection.connect(
      `create sequence id_requisito_formato start with 1`
    );
    consult = await connection.connect(
      `create table Categoria(      id_categoria int not null primary key,      nombre varchar(150) unique  )`
    );
    consult = await connection.connect(
      `create sequence id_categoria start with 1`
    );
    consult = await connection.connect(
      `create table Puesto(      id_puesto int not null primary key,      nombre varchar(150),      salario float,      unique(nombre,salario)  )`
    );
    consult = await connection.connect(
      `create sequence id_puesto start with 1`
    );
    consult = await connection.connect(
      `create table PuestoCategoria(      id_puesto_categoria int not null primary key,      id_puesto int not null,      id_categoria int not null,      constraint tk_puesto foreign key (id_puesto) references Puesto(id_puesto),      constraint tk_categoria foreign key (id_categoria) references Categoria(id_categoria),      unique(id_puesto, id_categoria)  )`
    );
    consult = await connection.connect(
      `create sequence id_puesto_categoria start with 1`
    );
    consult = await connection.connect(
      `create table PuestoRequisito(      id_puesto_requisito int not null primary key,      id_puesto int not null,      id_requisito int not null,      constraint tk_puestopr foreign key (id_puesto) references Puesto(id_puesto),      constraint tk_requisitopr foreign key (id_requisito) references Requisito(id_requisito),      unique(id_puesto,id_requisito)  )`
    );
    consult = await connection.connect(
      `create sequence id_puesto_requisito start with 1`
    );
    consult = await connection.connect(
      `create table Departamento(      id_departamento int not null primary key,      nombre varchar(150),      capital_total float,       coordinador int,      constraint tk_coordinadordep foreign key (coordinador) references Usuario(id_usuario),      unique(nombre, capital_total)  )`
    );
    consult = await connection.connect(
      `create sequence id_departamento start with 1`
    );
    consult = await connection.connect(
      `create table DepartamentoPadreHijo(      id_departamento_padre_hijo int not null primary key,      padre int,      hijo int,      constraint padre foreign key (padre) references Departamento(id_departamento),      constraint hijo foreign key (hijo) references Departamento(id_departamento),      unique(padre, hijo)  )`
    );
    consult = await connection.connect(
      `create sequence id_departamento_padre_hijo start with 1`
    );
    consult = await connection.connect(
      `create table DepartamentoPuesto(      id_departamento_puesto int not null primary key,      id_departamento int not null,      id_puesto int not null,      constraint tk_departamentodp foreign key (id_departamento) references Departamento(id_departamento),      constraint tk_puestodp foreign key (id_puesto) references Puesto(id_puesto),      unique(id_departamento, id_puesto)  )`
    );
    consult = await connection.connect(
      `create sequence id_departamento_puesto start with 1`
    );
    consult = await connection.connect(
      `create table DepartamentoUsuario(      id_departamento_usuario int not null primary key,      id_usuario int unique,      id_departamento int,      revisor varchar(1),      constraint usuario_depa foreign key (id_usuario) references Usuario(id_usuario),      constraint depa_usuario foreign key (id_departamento) references Departamento(id_departamento),      unique(id_usuario, id_departamento)    )`
    );
    consult = await connection.connect(
      `create sequence id_departamento_usuario start with 1`
    );

    consult = await connection.connect(
      `insert into tipousuario values (id_tipousuario.nextval, 'administrador')`
    );
    consult = await connection.connect(
      `insert into tipousuario values (id_tipousuario.nextval, 'aplicante')`
    );
    consult = await connection.connect(
      `insert into tipousuario values (id_tipousuario.nextval, 'coordinador')`
    );
    consult = await connection.connect(
      `insert into tipousuario values (id_tipousuario.nextval, 'guest')`
    );
    consult = await connection.connect(
      `insert into tipousuario values (id_tipousuario.nextval, 'revisor')`
    );
    consult = await connection.connect(
      `insert into usuario values (id_usuario.nextval, 'admin', 'admin',CURRENT_DATE,CURRENT_DATE,'T',1) `
    );

    res.json(consult);
  }
}

export const indexController = new IndexController();
