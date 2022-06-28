export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Debe identificarse.");
  res.redirect("/auth/signin");
};
export const isAdmin = (req, res, next) => {
  if (req.user.rol == "admin") {
    return next();
  }
  req.flash("error_msg", "No esta autorizado.");
  res.redirect("/productos");
};
