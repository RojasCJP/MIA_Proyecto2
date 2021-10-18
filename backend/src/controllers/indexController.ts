import { Request, Response } from "express";
import { connection } from "../database";

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
      "')";
    var res1 = await connection.connect(insert);
    console.log(res1);
    res.json({ status: res1.status });
  }
}

export const indexController = new IndexController();
