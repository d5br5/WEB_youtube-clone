import Video from "../models/Video";

const fakeUser = {
  username: "Doh",
  loggedIn: true,
};

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", {
      title: "Home",
      h1: "Welcome Wetube Page!",
      user: fakeUser,
      videos,
    });
  } catch (e) {
    return res.render("server-error");
  }
};

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", {
    title: "Watching Video",
    user: fakeUser,
  });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", {
    title: `Editing`,
    h1: `Edit video`,
    user: fakeUser,
  });
};

export const postEdit = (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { user: fakeUser, title: "Upload Video" });
};

export const postUpload = (req, res) => {
  // here we will add a video to the videos array
  const { title } = req.body;
  return res.redirect("/");
};

export const remove = (req, res) => {
  return res.send("Remove Video");
};

export const search = (req, res) => {
  return res.send("Search Video");
};
