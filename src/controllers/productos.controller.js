import logger from '../helpers/logger.js'
import {createProducto, getAll, getById, updateProd, deleteProd} from '../servicios/servProductos.js'

export const renderProductoForm = (req, res, next) => res.render("Productos/new-Producto");

export const createNewProducto = async (req, res, next) => {
  try {
    let prod = await createProducto(req)
    if(prod == true){
      req.flash("success_msg", "Producto agregado");
      logger.info('producto registrado')
      res.redirect("/productos"); 
    }else {
      let errors = prod
      res.render("Productos/new-Producto", {errors})
    }
  } catch (error) {
    logger.error(error)
    next(error)
  }
};

export const renderProductos = async (req, res, next) => {
  try {
    const Productos = await getAll();
    if(req.isAuthenticated()){
      if(req.user.rol == "admin"){
        res.render("Productos/all-Productos-admin", { Productos: Productos });    
      }else{
        res.render("Productos/all-Productos", { Productos: Productos}); 
      }
    }else{
      res.render("Productos/all-Productos", { Productos:Productos}); 
    }
  } catch (error) {
    logger.error(error)
    next(error)
  }
};

export const renderEditForm = async (req, res, next) => {
  try {
    const Producto = await getById(req.params.id);    
    res.render("Productos/edit-Producto", { 
      id: Producto[0]._id,
      nombre: Producto[0].nombre,
      descripcion: Producto[0].descripcion, 
      codigo: Producto[0].codigo, 
      foto: Producto[0].foto, 
      precio: Producto[0].precio, 
      stock: Producto[0].stock
     });    
  } catch (error) {
    logger.error(error)
    next(error)
  }
};

export const updateProducto = async (req, res, next) => {
  try {
    let prod = await updateProd(req)
    if(prod == true){
      req.flash("success_msg", "Producto actualizado");
      logger.info("Producto actualizado")
      res.redirect("/productos"); 
    }else {
      let errors = prod
      const { nombre, descripcion, codigo, foto, precio, stock } = req.body
      res.render("Productos/edit-Producto", {errors, id: req.params.id, nombre, descripcion, codigo, foto, precio, stock});
    }
  } catch (error) {
    logger.error(error)
    next(error)
  }
};

export const deleteProducto = async (req, res,next) => {
  try {
    await deleteProd(req.params.id);
    req.flash("success_msg", "Producto Eliminado");
    logger.info('producto eliminado')
    res.redirect("/Productos");      
  } catch (error) {
    logger.error(error)
    next(error)
  }
};
