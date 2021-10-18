import { Request, Response } from "express";
import { connection } from "../database";

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
}

export const consultController = new ConsultController();
