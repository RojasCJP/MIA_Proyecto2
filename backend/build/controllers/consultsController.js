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
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultController = void 0;
const database_1 = require("../database");
const config_1 = require("../mailer/config");
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
}
exports.consultController = new ConsultController();
