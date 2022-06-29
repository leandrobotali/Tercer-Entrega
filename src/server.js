//======================================================
//imports
import 'dotenv/config'
import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import methodOverride from "method-override";
import flash from "connect-flash";
import passport from "passport";
import MongoStore from "connect-mongo";
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import indexRoutes from "./routes/index.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import userRoutes from "./routes/auth.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import manejadorDeErrores from './libs/errores.js'
import "./config/passport.js";
import logger from './helpers/logger.js'


//======================================================
//app Initializations

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//======================================================
// static files
app.use(express.static(join(__dirname, "public")));

//======================================================
// settings
app.set("views", join(__dirname, "views"));

//======================================================
// config view engine
const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//======================================================
// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: '3era-entrega',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: (10 * 60 * 1000)
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://coderhouse:coderhouse@cluster0-shard-00-00.1xnky.mongodb.net:27017,cluster0-shard-00-01.1xnky.mongodb.net:27017,cluster0-shard-00-02.1xnky.mongodb.net:27017/sesiones?ssl=true&replicaSet=atlas-11uryb-shard-0&authSource=admin&retryWrites=true&w=majority'}),
    // store: MongoStore.create({ mongoUrl: process.env.MONGO_URI_STORE_SESSIONS}),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//======================================================
// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  if (req.user) if(req.user.rol == "admin") res.locals.admin = req.user
  next();
});

//======================================================
// routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(productosRoutes);
app.use(carritoRoutes);
app.use(manejadorDeErrores)

//======================================================
// ruta no implementada
app.use((req, res) => {
  logger.warn(`Se visito la ruta ${req.originalUrl} y metodo ${req.method}`)
  res.render("404");
});

//======================================================
//server

let server

export async function conectar({ port = 8080 }) {
  try {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            logger.info(`proceso '${process.pid}' escuchando en ${server.address().port}`)
            resolve()
        })
    })    
  } catch (error) {
    logger.error(error)
  }
}

export async function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(() => {
            resolve()
        })
    })
}
