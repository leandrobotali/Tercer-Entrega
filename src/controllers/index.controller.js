export const renderIndex = (req, res) => {
  res.render("index");
};

export const forWsp = (req, res) => {
  console.log(req.body);
  res.end();
};