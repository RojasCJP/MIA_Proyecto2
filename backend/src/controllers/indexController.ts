import { Request, Response } from "express";
import dbpool from "../database";

class IndexController {
  public index(req: Request, res: Response) {
    console.log(dbpool);
    res.json({ text: "server levantado" });
  }
}

export const indexController = new IndexController();
