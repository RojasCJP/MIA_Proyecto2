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
            if (json.departamentos[0] != undefined) {
                for (let i = 0; i < json.departamentos.length; i++) {
                    controller.leerDepartamento(json.departamentos[i].departamento, controller);
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
            console.log(entrada);
            controller.leerPuesto(entrada, controller);
            console.log("departamento");
        });
    }
    leerPuesto(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            controller.leerCategoria(entrada, controller);
            controller.leerRequisito(entrada, controller);
            console.log("puesto");
        });
    }
    leerCategoria(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("categoria");
        });
    }
    leerRequisito(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            controller.leerFormato(entrada, controller);
            console.log("requisito");
        });
    }
    leerFormato(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("formato");
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
}
exports.consultController = new ConsultController();
