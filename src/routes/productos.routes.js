import { Router } from "express";
import {
  renderProductoForm,
  createNewProducto,
  renderProductos,
  renderEditForm,
  updateProducto,
  deleteProducto,
} from "../controllers/productos.controller.js";
import { isAuthenticated, isAdmin } from "../helpers/auth.js";

const router = Router();

// Get All productos
router.get("/productos", renderProductos);

// New Producto
router.get("/productos/add", isAuthenticated, isAdmin, renderProductoForm);

router.post("/productos/new-producto", isAuthenticated,isAdmin, createNewProducto);

// Edit productos
router.get("/productos/edit/:id", isAuthenticated, isAdmin, renderEditForm);

router.put("/productos/edit-producto/:id", isAuthenticated,isAdmin, updateProducto);

// Delete productos
router.delete("/productos/delete/:id", isAuthenticated,isAdmin, deleteProducto);

export default router;
