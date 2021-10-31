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
      "',CURRENT_DATE,CURRENT_DATE,'T',2)";
    var consulta = await connection.connect(insert);
    console.log(consulta);
    res.json(consulta);
  }

  public async cargaMasiva(req: Request, res: Response) {
    var xml = req.body.xml;
    var json;
    json = convert.xml2json(xml, { compact: true, spaces: 4 });
    var entrada: Entrada | any = JSON.parse(json);
    var controller = new ConsultController();
    await controller.meterDatos(entrada, controller);
    res.json(entrada);
  }

  async meterDatos(json: any, controller: ConsultController) {
    if (json.departamentos.departamento[0] != undefined) {
      for (let i = 0; i < json.departamentos.departamento.length; i++) {
        await controller.leerDepartamento(
          json.departamentos.departamento[i],
          controller
        );
      }
    } else {
      await controller.leerDepartamento(
        json.departamentos.departamento,
        controller
      );
    }
  }

  async leerDepartamento(entrada: any, controller: ConsultController) {
    //TODO aqui tengo que pasarle el puesto o puestos
    const nombre = entrada.nombre._text;
    const capital = entrada.capital_total._text;
    const consulta =
      "insert into departamento (id_departamento, nombre, capital_total) values (id_departamento.nextval, '" +
      nombre +
      "', " +
      capital +
      ")";
    var response = await connection.connect(consulta);
    if (entrada.puestos.puesto[0] != undefined) {
      for (let i = 0; i < entrada.puestos.puesto.length; i++) {
        await controller.leerPuesto(entrada.puestos.puesto[i], controller);
        await controller.conexionDepartamentoPuesto(
          entrada.puestos.puesto[i].nombre._text,
          entrada.nombre._text
        );
      }
    } else {
      await controller.leerPuesto(entrada.puestos.puesto, controller);
      await controller.conexionDepartamentoPuesto(
        entrada.puestos.puesto.nombre._text,
        entrada.nombre._text
      );
    }
    if (entrada.departamentos != undefined) {
      if (entrada.departamentos.departamento[0] != undefined) {
        for (let i = 0; i < entrada.departamentos.departamento.length; i++) {
          await controller.leerDepartamento(
            entrada.departamentos.departamento[i],
            controller
          );
          await controller.conexionDepartamentoPadreHijo(
            entrada.nombre._text,
            entrada.departamentos.departamento[i].nombre._text
          );
        }
      } else if (entrada.departamentos.departamento != undefined) {
        await controller.leerDepartamento(
          entrada.departamentos.departamento,
          controller
        );
        await controller.conexionDepartamentoPadreHijo(
          entrada.nombre._text,
          entrada.departamentos.departamento.nombre._text
        );
      }
    }
    // console.log(response);
  }
  async leerPuesto(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const salario = entrada.salario._text;
    const consulta =
      "insert into puesto values (id_puesto.nextval, '" +
      nombre +
      "', " +
      salario +
      ")";
    await connection.connect(consulta);
    if (entrada.categorias.categoria[0] != undefined) {
      for (let i = 0; i < entrada.categorias.categoria.length; i++) {
        await controller.leerCategoria(
          entrada.categorias.categoria[i],
          controller
        );
        await controller.conexionPuestoCategoria(
          entrada.nombre._text,
          entrada.categorias.categoria[i].nombre._text
        );
      }
    } else {
      await controller.leerCategoria(entrada.categorias.categoria, controller);
      await controller.conexionPuestoCategoria(
        entrada.nombre._text,
        entrada.categorias.categoria.nombre._text
      );
    }
    if (entrada.requisitos.requisito[0] != undefined) {
      for (let i = 0; i < entrada.requisitos.requisito.length; i++) {
        await controller.leerRequisito(
          entrada.requisitos.requisito[i],
          controller
        );
        await controller.conexionPuestoRequisito(
          entrada.nombre._text,
          entrada.requisitos.requisito[i].nombre._text
        );
      }
    } else {
      await controller.leerRequisito(entrada.requisitos.requisito, controller);
      await controller.conexionPuestoRequisito(
        entrada.nombre._text,
        entrada.requisitos.requisito.nombre._text
      );
    }
  }
  async leerCategoria(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const consulta =
      "insert into categoria values (id_categoria.nextval, '" + nombre + "')";
    await connection.connect(consulta);
  }
  async leerRequisito(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const tamano = entrada.tamaño._text;
    const obligatorio = entrada.obligatorio._text;
    const consulta =
      "insert into requisito values (id_requisito.nextval,'" +
      nombre +
      "'," +
      tamano +
      "," +
      obligatorio +
      ")";
    await connection.connect(consulta);
    if (entrada.formatos.formato[0] != undefined) {
      for (let i = 0; i < entrada.formatos.formato.length; i++) {
        await controller.leerFormato(entrada.formatos.formato[i], controller);
        await controller.conexionRequisitoFormato(
          entrada.nombre._text,
          entrada.formatos.formato[i].nombre._text
        );
      }
    } else {
      await controller.leerFormato(entrada.formatos.formato, controller);
      await controller.conexionRequisitoFormato(
        entrada.nombre._text,
        entrada.formatos.formato.nombre._text
      );
    }
  }
  async leerFormato(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const consulta =
      "insert into formato values (id_formato.nextval, '" + nombre + "')";
    await connection.connect(consulta);
  }

  async conexionRequisitoFormato(requisito: string, formato: string) {
    var consulta1 =
      "select * from requisito where nombre = '" + requisito + "'";
    var consulta2 = "select * from formato where nombre = '" + formato + "'";
    var respuesta1: any = await connection.connect(consulta1);
    var respuesta2: any = await connection.connect(consulta2);
    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into requisitoformato values (id_requisito_formato.nextval, " +
        respuesta1.data[0].ID_REQUISITO +
        "," +
        respuesta2.data[0].ID_FORMATO +
        ")";
      await connection.connect(insert1);
      // console.log(insert1);
    }
  }
  async conexionPuestoRequisito(puesto: string, requisito: string) {
    var consulta1 = "select * from puesto where nombre = '" + puesto + "'";
    var consulta2 =
      "select * from requisito where nombre = '" + requisito + "'";
    var respuesta1: any = await connection.connect(consulta1);
    var respuesta2: any = await connection.connect(consulta2);
    console.log(respuesta1.data[0].ID_PUESTO);
    console.log(respuesta2.data[0].ID_REQUISITO);
    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into puestorequisito values (id_puesto_requisito.nextval, " +
        respuesta1.data[0].ID_PUESTO +
        "," +
        respuesta2.data[0].ID_REQUISITO +
        ")";
      await connection.connect(insert1);
      // console.log(insert1);
    }
  }
  async conexionPuestoCategoria(puesto: string, categoria: string) {
    console.log(puesto);
    console.log(categoria);
    var consulta1 = "select * from puesto where nombre = '" + puesto + "'";
    var consulta2 =
      "select * from categoria where nombre = '" + categoria + "'";
    var respuesta1: any = await connection.connect(consulta1);
    var respuesta2: any = await connection.connect(consulta2);
    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into puestocategoria values (id_puesto_categoria.nextval," +
        respuesta1.data[0].ID_PUESTO +
        "," +
        respuesta2.data[0].ID_CATEGORIA +
        ")";
      await connection.connect(insert1);
      // console.log(insert1);
    }
  }
  async conexionDepartamentoPuesto(puesto: string, departamento: string) {
    var consulta1 = "select * from puesto where nombre = '" + puesto + "'";
    var consulta2 =
      "select * from departamento where nombre = '" + departamento + "'";
    var respuesta1: any = await connection.connect(consulta1);
    var respuesta2: any = await connection.connect(consulta2);
    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into departamentopuesto values (id_departamento_puesto.nextval, " +
        respuesta2.data[0].ID_DEPARTAMENTO +
        "," +
        respuesta1.data[0].ID_PUESTO +
        ")";
      await connection.connect(insert1);
      // console.log(insert1);
    }
  }

  async conexionDepartamentoPadreHijo(padre: string, hijo: string) {
    var consulta1 = "select * from departamento where nombre = '" + padre + "'";
    var consulta2 = "select * from departamento where nombre = '" + hijo + "'";
    var respuesta1: any = await connection.connect(consulta1);
    var respuesta2: any = await connection.connect(consulta2);
    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into departamentopadrehijo values (id_departamento_padre_hijo.nextval, " +
        respuesta1.data[0].ID_DEPARTAMENTO +
        "," +
        respuesta2.data[0].ID_DEPARTAMENTO +
        ")";
      await connection.connect(insert1);
    }
  }

  async agregarCoordinador(req: Request, res: Response) {
    const usuario = req.body.user;
    const pass = req.body.password;
    const dep = req.body.dep;
    const consultaDepartamento =
      "select * from departamento where nombre = '" + dep + "'";
    const resDep: any = await connection.connect(consultaDepartamento);
    if (resDep.data[0].COORDINADOR != null) {
      console.log("existe coordinador");
      res.json({ text: "error ya existe un coordinador" });
      return;
    }
    console.log(resDep.data.length);
    if (resDep.data.length == 0) {
      console.log("no hay departamento");
      res.json({ text: "error el departamento no existe" });
      return;
    }
    const consulta =
      "insert into usuario values (id_usuario.nextval, '" +
      usuario +
      "', '" +
      pass +
      "',CURRENT_DATE,CURRENT_DATE,'T',3)";
    const getIdUser =
      "select id_usuario from usuario where username = '" +
      usuario +
      "' and password = '" +
      pass +
      "'";
    console.log(consulta);
    await connection.connect(consulta);
    var IdUser: any = await connection.connect(getIdUser);
    console.log("hasta aqui");
    const asignarUsuario =
      "update departamento set coordinador = " +
      IdUser.data[0].ID_USUARIO +
      " where id_departamento = " +
      resDep.data[0].ID_DEPARTAMENTO;
    var update = await connection.connect(asignarUsuario);
    console.log(update);
    res.json({ text: "todo bien" });
  }

  async modificarCoordinador(req: Request, res: Response) {}
  async eliminarCoordinador(req: Request, res: Response) {}

  async agregarRevisor(req: Request, res: Response) {
    const usuario = req.body.user;
    const pass = req.body.password;
    const dep = req.body.dep;
    const consultaDepartamento =
      "select * from departamento where nombre = '" + dep + "'";
    const resDep: any = await connection.connect(consultaDepartamento);
    console.log(resDep.data.length);
    if (resDep.data.length == 0) {
      console.log("no hay departamento");
      res.json({ text: "error el departamento no existe" });
      return;
    }
    const consulta =
      "insert into usuario values (id_usuario.nextval, '" +
      usuario +
      "', '" +
      pass +
      "',CURRENT_DATE,CURRENT_DATE,'T',5)";
    const getIdUser =
      "select id_usuario from usuario where username = '" +
      usuario +
      "' and password = '" +
      pass +
      "'";
    await connection.connect(consulta);
    var IdUser: any = await connection.connect(getIdUser);
    var asignarUsuario =
      "insert into departamentousuario values (id_departamento_usuario.nextval, " +
      IdUser.data[0].ID_USUARIO +
      "," +
      resDep.data[0].ID_DEPARTAMENTO +
      ",'T')";
    await connection.connect(asignarUsuario);
    res.json({ text: "todo bien" });
  }
  async modificarRevisor() {}
  async eliminarRevisor() {}
}

export const consultController = new ConsultController();
