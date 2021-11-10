"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", indexController_1.indexController.index);
        this.router.post("/user", indexController_1.indexController.user);
        this.router.post("/nuevoAplicante", indexController_1.indexController.nuevoAplicante);
        this.router.post("/updateAplicante", indexController_1.indexController.updateAplicante);
        this.router.get("/puestos", indexController_1.indexController.puestos);
        this.router.get("/allUsers", indexController_1.indexController.allUsers);
        this.router.get("/allDep", indexController_1.indexController.allDep);
        this.router.post("/searchPuestos", indexController_1.indexController.searchPuestos);
        this.router.get("/drops", indexController_1.indexController.runDrops);
        this.router.get("/script", indexController_1.indexController.runScript);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
