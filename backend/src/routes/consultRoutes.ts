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
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
