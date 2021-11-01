import { Router } from "express";
import { consultController } from "../controllers/consultsController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", consultController.index);
    this.router.get("/allUsers", consultController.allUsers);
    this.router.get("/allAplyers", consultController.allAplyers);
    this.router.post("/sendMail", consultController.sendMail);
    this.router.post("/cargaMasiva", consultController.cargaMasiva);
    this.router.post(
      "/coordinadorDepartamento",
      consultController.agregarCoordinador
    );
    this.router.post("/revisorDepartamento", consultController.agregarRevisor);
    this.router.post("/deleteAplyer", consultController.deleteAplyer);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
