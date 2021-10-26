"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultController = void 0;
const database_1 = require("../database");
const config_1 = require("../mailer/config");
const xml_js_1 = __importDefault(require("xml-js"));
class ConsultController {
    index(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            var consultaTipoUsuario = yield database_1.connection.connect("select * from tipousuario");
            console.log(consultaTipoUsuario);
            res.json(consultaTipoUsuario);
        });
    }
    allUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var consultaAllUsers = yield database_1.connection.connect("select * from usuario");
            res.json(consultaAllUsers);
        });
    }
    allAplyers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var consultaAplyers = yield database_1.connection.connect("select * from aplicante");
            res.json(consultaAplyers);
        });
    }
    sendMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var mail = new config_1.Mail(req.body.nombre, req.body.apellido, req.body.correo);
            var contra = yield mail.sendMail();
            var insert = "insert into usuario values (id_usuario.nextval, '" +
                req.body.nombre +
                req.body.apellido +
                "', '" +
                contra +
                "',CURRENT_DATE,CURRENT_DATE,'T',1)";
            var consulta = yield database_1.connection.connect(insert);
            console.log(consulta);
            res.json(consulta);
        });
    }
    cargaMasiva(req, res) {
        var xml = req.body.xml;
        var json;
        json = xml_js_1.default.xml2json(xml, { compact: true, spaces: 4 });
        var entrada = JSON.parse(json);
        var controller = new ConsultController();
        controller.meterDatos(entrada, controller);
        res.json(entrada);
    }
    meterDatos(json, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            if (json.departamentos.departamento[0] != undefined) {
                for (let i = 0; i < json.departamentos.departamento.length; i++) {
                    controller.leerDepartamento(json.departamentos.departamento[i], controller);
                }
            }
            else {
                controller.leerDepartamento(json.departamentos.departamento, controller);
            }
        });
    }
    leerDepartamento(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO aqui tengo que pasarle el puesto o puestos
            const nombre = entrada.nombre._text;
            const capital = entrada.capital_total._text;
            if (entrada.puestos.puesto[0] != undefined) {
                for (let i = 0; i < entrada.puestos.puesto.length; i++) {
                    controller.leerPuesto(entrada.puestos.puesto[i], controller);
                }
            }
            else {
                controller.leerPuesto(entrada.puestos.puesto, controller);
            }
            const consulta = "insert into departamento (id_departamento, nombre, capital_total) values (id_departamento.nextval, '" +
                nombre +
                "', " +
                capital +
                ")";
            var response = yield database_1.connection.connect(consulta);
            console.log(response);
        });
    }
    leerPuesto(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = entrada.nombre._text;
            const salario = entrada.salario._text;
            if (entrada.categorias.categoria[0] != undefined) {
                for (let i = 0; i < entrada.categorias.categoria.length; i++) {
                    controller.leerCategoria(entrada.categorias.categoria[i], controller);
                }
            }
            else {
                controller.leerCategoria(entrada.categorias.categoria, controller);
            }
            if (entrada.requisitos.requisito[0] != undefined) {
                for (let i = 0; i < entrada.requisitos.requisito.length; i++) {
                    controller.leerRequisito(entrada.requisitos.requisito[i], controller);
                }
            }
            else {
                controller.leerRequisito(entrada.requisitos.requisito, controller);
            }
            const consulta = "insert into puesto values (id_puesto.nextval, '" +
                nombre +
                "', " +
                salario +
                ")";
            yield database_1.connection.connect(consulta);
        });
    }
    leerCategoria(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = entrada.nombre._text;
            const consulta = "insert into categoria values (id_categoria.nextval, '" + nombre + "')";
            yield database_1.connection.connect(consulta);
        });
    }
    leerRequisito(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = entrada.nombre._text;
            const tamano = entrada.tamano._text;
            const obligatorio = entrada.obligatorio._text;
            if (entrada.formatos.formato[0] != undefined) {
                for (let i = 0; i < entrada.formatos.formato.length; i++) {
                    controller.leerFormato(entrada.formatos.formato[i], controller);
                }
            }
            else {
                controller.leerFormato(entrada.formatos.formato, controller);
            }
            const consulta = "insert into requisito values (id_requisito.nextval,'" +
                nombre +
                "'," +
                tamano +
                "," +
                obligatorio +
                ")";
            yield database_1.connection.connect(consulta);
        });
    }
    leerFormato(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = entrada.nombre._text;
            const consulta = "insert into formato values (id_formato.nextval, '" + nombre + "')";
            yield database_1.connection.connect(consulta);
        });
    }
    conexionRequisitoFormato() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("este lo tengo que poner cada vez que ingrese un requisito");
            console.log("deberia pasarle los requisitos para que luego se conecten con formatos");
        });
    }
    conexionPuestoRequisito() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("este tengo que pandarle lo del puesto");
        });
    }
    conexionPuestoCategoria() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("este tengo que pasarle lo del puesto");
        });
    }
    conexionDepartamentoPuesto() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("este tengo que pasarle lo de la categoria");
        });
    }
    // TODO tengo que hacer las conexiones pero falta cambiar unas cosas en el script
    agregarCoordinador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body.user;
            const pass = req.body.password;
            console.log(req.body);
            const consulta = "insert into usuario values (id_usuario.nextval, '" +
                usuario +
                "', '" +
                pass +
                "',CURRENT_DATE,CURRENT_DATE,'T',3)";
            var response = yield database_1.connection.connect(consulta);
            res.json({ text: response });
        });
    }
}
exports.consultController = new ConsultController();
