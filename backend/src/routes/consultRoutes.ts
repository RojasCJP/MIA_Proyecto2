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
    this.router.post("/searchAplyers", consultController.searchAplyers);
    this.router.post("/sendMail", consultController.sendMail);
    this.router.post("/cargaMasiva", consultController.cargaMasiva);
    this.router.post(
      "/coordinadorDepartamento",
      consultController.agregarCoordinador
    );
    this.router.post("/revisorDepartamento", consultController.agregarRevisor);
    this.router.post("/deleteAplyer", consultController.deleteAplyer);
    this.router.post("/deleteUser", consultController.eliminarUsuario);
    this.router.post("/editUser", consultController.editarUsuario);
    this.router.post("/searchUser", consultController.searchUser);
    this.router.post("/userFromDep", consultController.userFromDep);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
