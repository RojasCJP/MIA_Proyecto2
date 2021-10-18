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
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
