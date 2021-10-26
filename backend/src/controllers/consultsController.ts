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
    if (json.departamentos.departamento[0] != undefined) {
      for (let i = 0; i < json.departamentos.departamento.length; i++) {
        controller.leerDepartamento(
          json.departamentos.departamento[i],
          controller
        );
      }
    } else {
      controller.leerDepartamento(json.departamentos.departamento, controller);
    }
  }

  async leerDepartamento(entrada: any, controller: ConsultController) {
    //TODO aqui tengo que pasarle el puesto o puestos
    const nombre = entrada.nombre._text;
    const capital = entrada.capital_total._text;
    if (entrada.puestos.puesto[0] != undefined) {
      for (let i = 0; i < entrada.puestos.puesto.length; i++) {
        controller.leerPuesto(entrada.puestos.puesto[i], controller);
      }
    } else {
      controller.leerPuesto(entrada.puestos.puesto, controller);
    }
    const consulta =
      "insert into departamento (id_departamento, nombre, capital_total) values (id_departamento.nextval, '" +
      nombre +
      "', " +
      capital +
      ")";
    var response = await connection.connect(consulta);
    console.log(response);
  }
  async leerPuesto(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const salario = entrada.salario._text;
    if (entrada.categorias.categoria[0] != undefined) {
      for (let i = 0; i < entrada.categorias.categoria.length; i++) {
        controller.leerCategoria(entrada.categorias.categoria[i], controller);
      }
    } else {
      controller.leerCategoria(entrada.categorias.categoria, controller);
    }
    if (entrada.requisitos.requisito[0] != undefined) {
      for (let i = 0; i < entrada.requisitos.requisito.length; i++) {
        controller.leerRequisito(entrada.requisitos.requisito[i], controller);
      }
    } else {
      controller.leerRequisito(entrada.requisitos.requisito, controller);
    }
    const consulta =
      "insert into puesto values (id_puesto.nextval, '" +
      nombre +
      "', " +
      salario +
      ")";
    await connection.connect(consulta);
  }
  async leerCategoria(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const consulta =
      "insert into categoria values (id_categoria.nextval, '" + nombre + "')";
    await connection.connect(consulta);
  }
  async leerRequisito(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const tamano = entrada.tamano._text;
    const obligatorio = entrada.obligatorio._text;
    if (entrada.formatos.formato[0] != undefined) {
      for (let i = 0; i < entrada.formatos.formato.length; i++) {
        controller.leerFormato(entrada.formatos.formato[i], controller);
      }
    } else {
      controller.leerFormato(entrada.formatos.formato, controller);
    }
    const consulta =
      "insert into requisito values (id_requisito.nextval,'" +
      nombre +
      "'," +
      tamano +
      "," +
      obligatorio +
      ")";
    await connection.connect(consulta);
  }
  async leerFormato(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const consulta =
      "insert into formato values (id_formato.nextval, '" + nombre + "')";
    await connection.connect(consulta);
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

  // TODO tengo que hacer las conexiones pero falta cambiar unas cosas en el script

  async agregarCoordinador(req: Request, res: Response) {
    const usuario = req.body.user;
    const pass = req.body.password;
    console.log(req.body);
    const consulta =
      "insert into usuario values (id_usuario.nextval, '" +
      usuario +
      "', '" +
      pass +
      "',CURRENT_DATE,CURRENT_DATE,'T',3)";
    var response = await connection.connect(consulta);
    res.json({ text: response });
  }
}

export const consultController = new ConsultController();
