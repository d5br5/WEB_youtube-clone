import User from "../models/User";
import bcrypt from "bcrypt";

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });

  if (!user) {
    return res.status(404).render("404", { title: "User not found." });
  }

  return res.render("profile", { title: user.name, user });
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

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
  const user = await User.findOne({ username, socialOnly: false });
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

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";

  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };

  const params = new URLSearchParams(config).toString();

  const url = `${baseUrl}?${params}`;

  return res.redirect(url);
};

export const finishGithubLogin = async (req, res) => {
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };

  const params = new URLSearchParams(config).toString();
  const accessTokenURL = "https://github.com/login/oauth/access_token";
  const finalURL = `${accessTokenURL}?${params}`;

  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com/user";
    const userData = await (
      await fetch(apiUrl, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );

    if (!emailObj) {
      return res.redirect("/login");
    }

    let user = await User.findOne({ email: emailObj.email });

    if (!user) {
      user = await User.create({
        email: emailObj.email,
        username: userData.login,
        password: "",
        socialOnly: true,
        name: userData.name,
        location: userData.location,
        avatarUrl: userData.avatar_url,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { title: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, email: sessionEmail, username: sessionUsername, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;

  let searchParams = [];

  if (sessionEmail !== email) {
    searchParams.push({ email });
  }

  if (sessionUsername !== username) {
    searchParams.push({ username });
  }

  console.log(file);

  if (searchParams.length > 0) {
    const foundUser = await User.findOne({ $or: searchParams });
    if (foundUser && foundUser._id.toString() !== _id) {
      return res.status(400).render("edit-profile", {
        title: "Edit Profile",
        errorMessage: "This email/username is already taken.",
      });
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
      avatarUrl: file ? file.path : avatarUrl,
    },
    { new: true }
  );

  req.session.user = updatedUser;

  return res.redirect("/user/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("change-password", { title: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;

  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("change-password", {
      title: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }

  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("change-password", {
      title: "Change Password",
      errorMessage: "The password does not match the confirmation",
    });
  }

  user.password = newPassword;
  await user.save();

  // send notification
  return res.redirect("/user/logout");
};
