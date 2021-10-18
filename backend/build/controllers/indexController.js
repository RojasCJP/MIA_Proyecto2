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
exports.indexController = void 0;
const database_1 = require("../database");
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ text: "server levantado desde node" });
        });
    }
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var username = req.body.username;
            var pass = req.body.password;
            var consulta1 = "select count(password) as cuenta from usuario where username = '" +
                username +
                "' and password = '" +
                pass +
                "'";
            var consulta2 = "select id_tipousuario as tipo from usuario where username = '" +
                username +
                "' and password = '" +
                pass +
                "'";
            var result = yield database_1.connection.connect(consulta1);
            var tipo = yield database_1.connection.connect(consulta2);
            if (tipo.data.length == 0) {
                tipo.data = [{ TIPO: 0 }];
            }
            if (result.data[0].CUENTA == 1) {
                res.json({ entrada: true, tipo: tipo.data[0].TIPO });
            }
            else {
                res.json({ entrada: false, tipo: tipo.data[0].TIPO });
            }
        });
    }
    nuevoAplicante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cui = req.body.cui;
            var nombre = req.body.nombre;
            var apellido = req.body.apellido;
            var correo = req.body.correo;
            var direccion = req.body.direccion;
            const insert = "insert into aplicante values (" +
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
            var res1 = yield database_1.connection.connect(insert);
            console.log(res1);
            res.json({ status: res1.status });
        });
    }
}
exports.indexController = new IndexController();
