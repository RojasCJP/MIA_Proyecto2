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
    deleteAplyer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cui = req.body.cui;
            var deleteAplyer = "delete from aplicante where cui = " + cui;
            yield database_1.connection.connect(deleteAplyer);
            res.json({ text: "eliminar aplicante" });
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
                "',CURRENT_DATE,CURRENT_DATE,'T',2)";
            var consulta = yield database_1.connection.connect(insert);
            console.log(consulta);
            res.json(consulta);
        });
    }
    cargaMasiva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var xml = req.body.xml;
            var json;
            json = xml_js_1.default.xml2json(xml, { compact: true, spaces: 4 });
            var entrada = JSON.parse(json);
            var controller = new ConsultController();
            yield controller.meterDatos(entrada, controller);
            res.json(entrada);
        });
    }
    meterDatos(json, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            if (json.departamentos.departamento[0] != undefined) {
                for (let i = 0; i < json.departamentos.departamento.length; i++) {
                    yield controller.leerDepartamento(json.departamentos.departamento[i], controller);
                }
            }
            else {
                yield controller.leerDepartamento(json.departamentos.departamento, controller);
            }
        });
    }
    leerDepartamento(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO aqui tengo que pasarle el puesto o puestos
            const nombre = entrada.nombre._text;
            const capital = entrada.capital_total._text;
            const consulta = "insert into departamento (id_departamento, nombre, capital_total) values (id_departamento.nextval, '" +
                nombre +
                "', " +
                capital +
                ")";
            var response = yield database_1.connection.connect(consulta);
            if (entrada.puestos.puesto[0] != undefined) {
                for (let i = 0; i < entrada.puestos.puesto.length; i++) {
                    yield controller.leerPuesto(entrada.puestos.puesto[i], controller);
                    yield controller.conexionDepartamentoPuesto(entrada.puestos.puesto[i].nombre._text, entrada.nombre._text);
                }
            }
            else {
                yield controller.leerPuesto(entrada.puestos.puesto, controller);
                yield controller.conexionDepartamentoPuesto(entrada.puestos.puesto.nombre._text, entrada.nombre._text);
            }
            if (entrada.departamentos != undefined) {
                if (entrada.departamentos.departamento[0] != undefined) {
                    for (let i = 0; i < entrada.departamentos.departamento.length; i++) {
                        yield controller.leerDepartamento(entrada.departamentos.departamento[i], controller);
                        yield controller.conexionDepartamentoPadreHijo(entrada.nombre._text, entrada.departamentos.departamento[i].nombre._text);
                    }
                }
                else if (entrada.departamentos.departamento != undefined) {
                    yield controller.leerDepartamento(entrada.departamentos.departamento, controller);
                    yield controller.conexionDepartamentoPadreHijo(entrada.nombre._text, entrada.departamentos.departamento.nombre._text);
                }
            }
            // console.log(response);
        });
    }
    leerPuesto(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = entrada.nombre._text;
            const salario = entrada.salario._text;
            const consulta = "insert into puesto values (id_puesto.nextval, '" +
                nombre +
                "', " +
                salario +
                ")";
            yield database_1.connection.connect(consulta);
            if (entrada.categorias.categoria[0] != undefined) {
                for (let i = 0; i < entrada.categorias.categoria.length; i++) {
                    yield controller.leerCategoria(entrada.categorias.categoria[i], controller);
                    yield controller.conexionPuestoCategoria(entrada.nombre._text, entrada.categorias.categoria[i].nombre._text);
                }
            }
            else {
                yield controller.leerCategoria(entrada.categorias.categoria, controller);
                yield controller.conexionPuestoCategoria(entrada.nombre._text, entrada.categorias.categoria.nombre._text);
            }
            if (entrada.requisitos.requisito[0] != undefined) {
                for (let i = 0; i < entrada.requisitos.requisito.length; i++) {
                    yield controller.leerRequisito(entrada.requisitos.requisito[i], controller);
                    yield controller.conexionPuestoRequisito(entrada.nombre._text, entrada.requisitos.requisito[i].nombre._text);
                }
            }
            else {
                yield controller.leerRequisito(entrada.requisitos.requisito, controller);
                yield controller.conexionPuestoRequisito(entrada.nombre._text, entrada.requisitos.requisito.nombre._text);
            }
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
            const tamano = entrada.tamaño._text;
            const obligatorio = entrada.obligatorio._text;
            const consulta = "insert into requisito values (id_requisito.nextval,'" +
                nombre +
                "'," +
                tamano +
                "," +
                obligatorio +
                ")";
            yield database_1.connection.connect(consulta);
            if (entrada.formatos.formato[0] != undefined) {
                for (let i = 0; i < entrada.formatos.formato.length; i++) {
                    yield controller.leerFormato(entrada.formatos.formato[i], controller);
                    yield controller.conexionRequisitoFormato(entrada.nombre._text, entrada.formatos.formato[i].nombre._text);
                }
            }
            else {
                yield controller.leerFormato(entrada.formatos.formato, controller);
                yield controller.conexionRequisitoFormato(entrada.nombre._text, entrada.formatos.formato.nombre._text);
            }
        });
    }
    leerFormato(entrada, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = entrada.nombre._text;
            const consulta = "insert into formato values (id_formato.nextval, '" + nombre + "')";
            yield database_1.connection.connect(consulta);
        });
    }
    conexionRequisitoFormato(requisito, formato) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta1 = "select * from requisito where nombre = '" + requisito + "'";
            var consulta2 = "select * from formato where nombre = '" + formato + "'";
            var respuesta1 = yield database_1.connection.connect(consulta1);
            var respuesta2 = yield database_1.connection.connect(consulta2);
            if (respuesta1.data != undefined && respuesta2.data != undefined) {
                var insert1 = "insert into requisitoformato values (id_requisito_formato.nextval, " +
                    respuesta1.data[0].ID_REQUISITO +
                    "," +
                    respuesta2.data[0].ID_FORMATO +
                    ")";
                yield database_1.connection.connect(insert1);
                // console.log(insert1);
            }
        });
    }
    conexionPuestoRequisito(puesto, requisito) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta1 = "select * from puesto where nombre = '" + puesto + "'";
            var consulta2 = "select * from requisito where nombre = '" + requisito + "'";
            var respuesta1 = yield database_1.connection.connect(consulta1);
            var respuesta2 = yield database_1.connection.connect(consulta2);
            console.log(respuesta1.data[0].ID_PUESTO);
            console.log(respuesta2.data[0].ID_REQUISITO);
            if (respuesta1.data != undefined && respuesta2.data != undefined) {
                var insert1 = "insert into puestorequisito values (id_puesto_requisito.nextval, " +
                    respuesta1.data[0].ID_PUESTO +
                    "," +
                    respuesta2.data[0].ID_REQUISITO +
                    ")";
                yield database_1.connection.connect(insert1);
                // console.log(insert1);
            }
        });
    }
    conexionPuestoCategoria(puesto, categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(puesto);
            console.log(categoria);
            var consulta1 = "select * from puesto where nombre = '" + puesto + "'";
            var consulta2 = "select * from categoria where nombre = '" + categoria + "'";
            var respuesta1 = yield database_1.connection.connect(consulta1);
            var respuesta2 = yield database_1.connection.connect(consulta2);
            if (respuesta1.data != undefined && respuesta2.data != undefined) {
                var insert1 = "insert into puestocategoria values (id_puesto_categoria.nextval," +
                    respuesta1.data[0].ID_PUESTO +
                    "," +
                    respuesta2.data[0].ID_CATEGORIA +
                    ")";
                yield database_1.connection.connect(insert1);
                // console.log(insert1);
            }
        });
    }
    conexionDepartamentoPuesto(puesto, departamento) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta1 = "select * from puesto where nombre = '" + puesto + "'";
            var consulta2 = "select * from departamento where nombre = '" + departamento + "'";
            var respuesta1 = yield database_1.connection.connect(consulta1);
            var respuesta2 = yield database_1.connection.connect(consulta2);
            if (respuesta1.data != undefined && respuesta2.data != undefined) {
                var insert1 = "insert into departamentopuesto values (id_departamento_puesto.nextval, " +
                    respuesta2.data[0].ID_DEPARTAMENTO +
                    "," +
                    respuesta1.data[0].ID_PUESTO +
                    ")";
                yield database_1.connection.connect(insert1);
                // console.log(insert1);
            }
        });
    }
    conexionDepartamentoPadreHijo(padre, hijo) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta1 = "select * from departamento where nombre = '" + padre + "'";
            var consulta2 = "select * from departamento where nombre = '" + hijo + "'";
            var respuesta1 = yield database_1.connection.connect(consulta1);
            var respuesta2 = yield database_1.connection.connect(consulta2);
            if (respuesta1.data != undefined && respuesta2.data != undefined) {
                var insert1 = "insert into departamentopadrehijo values (id_departamento_padre_hijo.nextval, " +
                    respuesta1.data[0].ID_DEPARTAMENTO +
                    "," +
                    respuesta2.data[0].ID_DEPARTAMENTO +
                    ")";
                yield database_1.connection.connect(insert1);
            }
        });
    }
    agregarCoordinador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body.user;
            const pass = req.body.password;
            const dep = req.body.dep;
            const consultaDepartamento = "select * from departamento where nombre = '" + dep + "'";
            const resDep = yield database_1.connection.connect(consultaDepartamento);
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
            const consulta = "insert into usuario values (id_usuario.nextval, '" +
                usuario +
                "', '" +
                pass +
                "',CURRENT_DATE,CURRENT_DATE,'T',3)";
            const getIdUser = "select id_usuario from usuario where username = '" +
                usuario +
                "' and password = '" +
                pass +
                "'";
            console.log(consulta);
            yield database_1.connection.connect(consulta);
            var IdUser = yield database_1.connection.connect(getIdUser);
            console.log("hasta aqui");
            const asignarUsuario = "update departamento set coordinador = " +
                IdUser.data[0].ID_USUARIO +
                " where id_departamento = " +
                resDep.data[0].ID_DEPARTAMENTO;
            var update = yield database_1.connection.connect(asignarUsuario);
            console.log(update);
            res.json({ text: "todo bien" });
        });
    }
    modificarCoordinador(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    eliminarCoordinador(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    agregarRevisor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body.user;
            const pass = req.body.password;
            const dep = req.body.dep;
            const consultaDepartamento = "select * from departamento where nombre = '" + dep + "'";
            const resDep = yield database_1.connection.connect(consultaDepartamento);
            console.log(resDep.data.length);
            if (resDep.data.length == 0) {
                console.log("no hay departamento");
                res.json({ text: "error el departamento no existe" });
                return;
            }
            const consulta = "insert into usuario values (id_usuario.nextval, '" +
                usuario +
                "', '" +
                pass +
                "',CURRENT_DATE,CURRENT_DATE,'T',5)";
            const getIdUser = "select id_usuario from usuario where username = '" +
                usuario +
                "' and password = '" +
                pass +
                "'";
            yield database_1.connection.connect(consulta);
            var IdUser = yield database_1.connection.connect(getIdUser);
            var asignarUsuario = "insert into departamentousuario values (id_departamento_usuario.nextval, " +
                IdUser.data[0].ID_USUARIO +
                "," +
                resDep.data[0].ID_DEPARTAMENTO +
                ",'T')";
            yield database_1.connection.connect(asignarUsuario);
            res.json({ text: "todo bien" });
        });
    }
    modificarRevisor() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    eliminarRevisor() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.consultController = new ConsultController();
