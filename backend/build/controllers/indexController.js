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
const config_1 = require("../mailer/config");
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
            var consulta2 = "select id_tipousuario as tipo, id_usuario as id from usuario where username = '" +
                username +
                "' and password = '" +
                pass +
                "'";
            var result = yield database_1.connection.connect(consulta1);
            var tipo = yield database_1.connection.connect(consulta2);
            var consulta3 = "";
            if (tipo.data.length > 0) {
                consulta3 =
                    "select id_departamento as departamento from departamentousuario where id_usuario = " +
                        tipo.data[0].ID;
            }
            var dep = yield database_1.connection.connect(consulta3);
            var departamentoaux = null;
            if (dep.data != undefined) {
                if (dep.data[0] != undefined) {
                    departamentoaux = dep.data[0].DEPARTAMENTO;
                }
            }
            console.log(departamentoaux);
            if (tipo.data.length == 0) {
                tipo.data = [{ TIPO: 0 }];
            }
            if (result.data[0].CUENTA == 1) {
                res.json({
                    entrada: true,
                    tipo: tipo.data[0].TIPO,
                    departament: departamentoaux,
                });
            }
            else {
                res.json({
                    entrada: false,
                    tipo: tipo.data[0].TIPO,
                    departament: departamentoaux,
                });
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
            var cv = req.body.cv;
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
                "', '" +
                cv +
                "')";
            var res1 = yield database_1.connection.connect(insert);
            var mail = new config_1.Mail(nombre, apellido, correo);
            mail.sendMesage();
            console.log(res1);
            res.json({ status: res1.status });
        });
    }
    updateAplicante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cui = req.body.cui;
            var nombre = req.body.nombre;
            var apellido = req.body.apellido;
            var correo = req.body.correo;
            var direccion = req.body.direccion;
            var cv = req.body.cv;
            const update = "update aplicante set nombre='" +
                nombre +
                "',apellido='" +
                apellido +
                "',correo='" +
                correo +
                "',direccion='" +
                direccion +
                "',cv='" +
                cv +
                "' where cui = " +
                cui;
            var res1 = yield database_1.connection.connect(update);
            res.json({ status: res1.status });
        });
    }
    puestos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta = "select Puesto.nombre as puesto, Departamento.nombre as departamento, Puesto.salario as salario from DepartamentoPuesto    inner join Departamento on Departamento.id_departamento = DepartamentoPuesto.id_departamento    inner join Puesto on Puesto.id_puesto = DepartamentoPuesto.id_puesto";
            var consultaAplyers = yield database_1.connection.connect(consulta);
            res.json(consultaAplyers);
        });
    }
    allUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta = "select * from usuario";
            var consultUsers = yield database_1.connection.connect(consulta);
            res.json(consultUsers);
        });
    }
    allDep(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta = "select nombre, capital_total as capital, Usuario.username from departamento left outer join Usuario on Usuario.id_usuario = Departamento.coordinador";
            var consultDep = yield database_1.connection.connect(consulta);
            res.json(consultDep);
        });
    }
}
exports.indexController = new IndexController();
