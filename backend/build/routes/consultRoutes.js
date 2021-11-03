"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultsController_1 = require("../controllers/consultsController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", consultsController_1.consultController.index);
        this.router.get("/allUsers", consultsController_1.consultController.allUsers);
        this.router.get("/allAplyers", consultsController_1.consultController.allAplyers);
        this.router.post("/sendMail", consultsController_1.consultController.sendMail);
        this.router.post("/cargaMasiva", consultsController_1.consultController.cargaMasiva);
        this.router.post("/coordinadorDepartamento", consultsController_1.consultController.agregarCoordinador);
        this.router.post("/revisorDepartamento", consultsController_1.consultController.agregarRevisor);
        this.router.post("/deleteAplyer", consultsController_1.consultController.deleteAplyer);
        this.router.post("/deleteUser", consultsController_1.consultController.eliminarUsuario);
        this.router.post("/editUser", consultsController_1.consultController.editarUsuario);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
