import producto from "../daos/DaosProductos.js";
import logger from '../helpers/logger.js'

export const renderProductoForm = (req, res, next) => res.render("Productos/new-Producto");

export const createNewProducto = async (req, res, next) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const errors = [];
  if (!nombre) {errors.push({ text: "Falta el nombre del Producto." })}
  if (!descripcion) {errors.push({ text: "Falta la Descripción del Producto." })}
  if (!codigo) {errors.push({ text: "Falta el codigo del Producto." })}
  if (!foto) {errors.push({ text: "Falta la foto del Producto." })}
  if (!precio) {errors.push({ text: "Falta el precio del Producto." })}
  if (!stock) {errors.push({ text: "Falta el stock del Producto." })}
  if (errors.length > 0)
    return res.render("Productos/new-Producto", {
      errors,
      nombre,
      description, 
      codigo, 
      foto, 
      precio, 
      stock
    });
    try {
      await producto.save(req);
      req.flash("success_msg", "Producto agregado");
      logger.info('producto ' + nombre + ' registrado ')
      res.redirect("/productos");      
    } catch (error) {
      logger.error(error)
      next(error)
    }
};

export const renderProductos = async (req, res, next) => {
  try {
    const Productos = await producto.getAll();
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
    const Producto = await producto.getById(req.params.id);    
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

export const updateProducto = async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const errors = [];
  if (!nombre) {errors.push({ text: "Falta el nombre del Producto." })}
  if (!descripcion) {errors.push({ text: "Falta la Descripción del Producto." })}
  if (!codigo) {errors.push({ text: "Falta el codigo del Producto." })}
  if (!foto) {errors.push({ text: "Falta la foto del Producto." })}
  if (!precio) {errors.push({ text: "Falta el precio del Producto." })}
  if (!stock) {errors.push({ text: "Falta el stock del Producto." })}
  if (errors.length > 0)
    return res.render("Productos/new-Producto", {
      errors,
      nombre,
      description, 
      codigo, 
      foto, 
      precio, 
      stock
    });
    try {
      await producto.updateById(req);
      req.flash("success_msg", "Producto actualizado");
      logger.info('producto ' + nombre + ' actualizado ')
      res.redirect("/productos");      
    } catch (error) {
      logger.error(error)
      next(error)
    }
};

export const deleteProducto = async (req, res,next) => {
  try {
    await producto.deleteById(req.params.id);
    req.flash("success_msg", "Producto Eliminado");
    logger.info('producto eliminado')
    res.redirect("/Productos");      
  } catch (error) {
    logger.error(error)
    next(error)
  }
};
