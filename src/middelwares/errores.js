import logger from "../helpers/logger.js";

export default (err, req, res, next) => {
    if(err){
        res.status(500).json({ msg: err.message })
    }else{
        //======================================================
        // ruta no implementada
        logger.warn(`Se visito la ruta ${req.originalUrl} y metodo ${req.method}`)
        res.render("404");
    }
}