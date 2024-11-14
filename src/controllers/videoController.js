import Video from "../models/Video";

const fakeUser = {
  username: "Doh",
  loggedIn: true,
};

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", {
      title: "Wetube Home",
      user: fakeUser,
      videos,
    });
  } catch (e) {
    return res.render("server-error");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { title: "Video not found." });
  }
  return res.render("watch", {
    title: "Watching Video",
    user: fakeUser,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { title: "Video not found." });
  }

  return res.render("edit", {
    title: `Editing: ${video.title}`,
    user: fakeUser,
    video,
  });
};

export const postEdit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const exist = await Video.exists({ _id: id });
    if (!exist) {
      return res.status(404).render("404", { title: "Video not found." });
    }
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/video/${id}`);
  } catch (e) {
    return res.status(400).render("edit", {
      title: `Editing`,
      h1: `Edit video`,
      user: fakeUser,
      errorMessage: e._message,
    });
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { user: fakeUser, title: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (e) {
    return res.render("upload", {
      title: "Upload Video",
      errorMessage: e._message,
    });
  }
};

export const remove = (req, res) => {
  return res.send("Remove Video");
};

export const search = (req, res) => {
  return res.send("Search Video");
};
