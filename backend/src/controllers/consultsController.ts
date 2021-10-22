import { Request, Response } from "express";
import { connection } from "../database";
import { Mail } from "../mailer/config";

class ConsultController {
  public async index(res: Response, req: Request) {
    var consultaTipoUsuario = await connection.connect(
      "select * from tipousuario"
    );
    console.log(consultaTipoUsuario);
    res.json(consultaTipoUsuario);
  }

  public async allUsers(req: Request, res: Response) {
    var consultaAllUsers = await connection.connect("select * from usuario");
    res.json(consultaAllUsers);
  }

  public async allAplyers(req: Request, res: Response) {
    var consultaAplyers = await connection.connect("select * from aplicante");
    res.json(consultaAplyers);
  }

  public async sendMail(req: Request, res: Response) {
    var mail = new Mail(req.body.nombre, req.body.apellido, req.body.correo);
    var contra: string = await mail.sendMail();
    var insert: string =
      "insert into usuario values (id_usuario.nextval, '" +
      req.body.nombre +
      req.body.apellido +
      "', '" +
      contra +
      "',CURRENT_DATE,CURRENT_DATE,'T',1)";
    var consulta = await connection.connect(insert);
    console.log(consulta);
    res.json(consulta);
  }
}

export const consultController = new ConsultController();
