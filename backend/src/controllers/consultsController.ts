import { json, Request, Response } from "express";
import { connection } from "../database";
import { Mail } from "../mailer/config";
import convert from "xml-js";
import { Entrada } from "../interfaces/entrada";

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

  public cargaMasiva(req: Request, res: Response) {
    var xml = req.body.xml;
    var json;
    json = convert.xml2json(xml, { compact: true, spaces: 4 });
    var entrada: Entrada | any = JSON.parse(json);
    var controller = new ConsultController();
    controller.meterDatos(entrada, controller);
    res.json(entrada);
  }

  async meterDatos(json: any, controller: ConsultController) {
    if (json.departamentos[0] != undefined) {
      for (let i = 0; i < json.departamentos.length; i++) {
        controller.leerDepartamento(
          json.departamentos[i].departamento,
          controller
        );
      }
    } else {
      controller.leerDepartamento(json.departamentos.departamento, controller);
    }
  }

  async leerDepartamento(entrada: any, controller: ConsultController) {
    //TODO aqui tengo que pasarle el puesto o puestos
    console.log(entrada);
    controller.leerPuesto(entrada, controller);
    console.log("departamento");
  }
  async leerPuesto(entrada: any, controller: ConsultController) {
    controller.leerCategoria(entrada, controller);
    controller.leerRequisito(entrada, controller);
    console.log("puesto");
  }
  async leerCategoria(entrada: any, controller: ConsultController) {
    console.log("categoria");
  }
  async leerRequisito(entrada: any, controller: ConsultController) {
    controller.leerFormato(entrada, controller);
    console.log("requisito");
  }
  async leerFormato(entrada: any, controller: ConsultController) {
    console.log("formato");
  }

  async conexionRequisitoFormato() {
    console.log("este lo tengo que poner cada vez que ingrese un requisito");
    console.log(
      "deberia pasarle los requisitos para que luego se conecten con formatos"
    );
  }
  async conexionPuestoRequisito() {
    console.log("este tengo que pandarle lo del puesto");
  }
  async conexionPuestoCategoria() {
    console.log("este tengo que pasarle lo del puesto");
  }
  async conexionDepartamentoPuesto() {
    console.log("este tengo que pasarle lo de la categoria");
  }
}

export const consultController = new ConsultController();
