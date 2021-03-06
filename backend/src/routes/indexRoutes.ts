import { Router } from "express";
import { indexController } from "../controllers/indexController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", indexController.index);
    this.router.post("/user", indexController.user);
    this.router.post("/nuevoAplicante", indexController.nuevoAplicante);
    this.router.post("/updateAplicante", indexController.updateAplicante);
    this.router.get("/puestos", indexController.puestos);
    this.router.get("/allUsers", indexController.allUsers);
    this.router.get("/allDep", indexController.allDep);
    this.router.post("/searchPuestos", indexController.searchPuestos);
    this.router.get("/drops", indexController.runDrops);
    this.router.get("/script", indexController.runScript);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
