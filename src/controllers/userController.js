import User from "../models/User";
import bcrypt from "bcrypt";

export const login = (req, res) => res.send("Login");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");

export const getJoin = (req, res) => {
  return res.render("join", { title: "Create Account" });
};

export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  const title = "Create Account";

  if (password !== password2) {
    return res.status(400).render("join", {
      title,
      errorMessage: "Password confirmation does not match.",
    });
  }

  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      title,
      errorMessage: "This username/email is already taken.",
    });
  }

  try {
    await User.create({ email, username, password, name, location });
    return res.redirect("/login");
  } catch (e) {
    return res.status(400).render("join", {
      title,
      errorMessage: e._message,
    });
  }
};

export const getLogin = async (req, res) => {
  const user = await User.find({});
  return res.render("login", { title: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      title: "Login",
      errorMessage: "An account with this username does not exists.",
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      title: "Login",
      errorMessage: "Wrong password",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};
