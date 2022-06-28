export const renderIndex = (req, res) => {
  res.render("index");
};

export const forWsp = (req, res) => {
  res.send({mensage:'mensage recibido'})
};