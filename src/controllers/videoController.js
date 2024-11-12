export const see = (req, res) => {
  console.log(req.params);
  return res.send("Watch Video");
};

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const edit = (req, res) => {
  return res.send("Edit Video");
};

export const remove = (req, res) => {
  return res.send("Remove Video");
};
export const upload = (req, res) => {
  return res.send("Upload Video");
};
export const search = (req, res) => {
  return res.send("Search Video");
};
