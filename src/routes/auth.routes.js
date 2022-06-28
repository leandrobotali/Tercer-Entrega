import { Router } from "express";
import {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  uploadImg,
  perfil,
  logout,
} from "../controllers/auth.controllers.js";
import { isAuthenticated } from "../helpers/auth.js";
import upload from "../helpers/procArchivo.js";

const router = Router();

// Routes
router.get("/auth/signup", renderSignUpForm);

router.post("/auth/signup", singup);

router.get("/auth/signin", renderSigninForm);

router.post("/auth/signin", signin);

router.get("/auth/perfil", isAuthenticated, perfil);

router.post("/auth/upload", isAuthenticated,  upload.single('myFile'), uploadImg);

router.get("/auth/logout", isAuthenticated, logout);

export default router;
