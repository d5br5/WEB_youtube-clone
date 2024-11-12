export const see = (req, res) => {
  console.log(req.params);
  return res.render("watch", { title: "Watch", h1: "Watch Video Page" });
};

export const trending = (req, res) => {
  return res.render("home", { title: "Home", h1: "Welcome Wetube Page!" });
};

export const edit = (req, res) => {
  return res.render("edit", { title: "Edit", h1: "Edit your video" });
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
