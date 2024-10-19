import express from "express";
import {
  create,
  getAll,
  remove,
  update,
} from "../controllers/product.controllers.js";

const productRouter = express.Router();

// productRouter.route("/").post(create).get(getAll);
// productRouter.route("/:id").delete(remove).put(update);

productRouter.get("/", getAll);
productRouter.post("/", create);
productRouter.put("/:id", update);
productRouter.delete("/:id", remove);

export default productRouter;
