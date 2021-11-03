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
      "select id_tipousuario as tipo from usuario where username = '" +
      username +
      "' and password = '" +
      pass +
      "'";
    var result: any = await connection.connect(consulta1);
    var tipo: any = await connection.connect(consulta2);
    if (tipo.data.length == 0) {
      tipo.data = [{ TIPO: 0 }];
    }
    if (result.data[0].CUENTA == 1) {
      res.json({ entrada: true, tipo: tipo.data[0].TIPO });
    } else {
      res.json({ entrada: false, tipo: tipo.data[0].TIPO });
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

  public async allUsers(req: Request, res: Response) {
    var consulta = "select * from usuario";
    var consultUsers = await connection.connect(consulta);
    res.json(consultUsers);
  }

  public async allDep(req: Request, res: Response) {
    var consulta =
      "select nombre, capital_total as capital, Usuario.username from departamento left outer join Usuario on Usuario.id_usuario = Departamento.coordinador";
    var consultDep = await connection.connect(consulta);
    res.json(consultDep);
  }
}

export const indexController = new IndexController();
