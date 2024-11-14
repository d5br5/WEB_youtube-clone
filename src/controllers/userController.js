import User from "../models/User";

export const login = (req, res) => res.send("Login");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");

export const getJoin = (req, res) => {
  return res.render("join", { title: "Create Account" });
};

export const postJoin = async (req, res) => {
  const { email, username, password, name, location } = req.body;
  await User.create({ email, username, password, name, location });
  return res.redirect("/login");
};

export const getLogin = async (req, res) => {
  const user = await User.find({});
  console.log(user);
  return res.render("login", { title: "Login" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("login", {
      errorMessage: "An account with this email does not exists.",
    });
  }
  // const hashedPassword = bcrypt.compare(password, user.password);

  return res.redirect("/");
};
