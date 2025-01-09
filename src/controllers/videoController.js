import Video from "../models/Video";
import User from "../models/User";

const fakeUser = {
  username: "Doh",
  loggedIn: true,
};

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate("owner");
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
  const video = await Video.findById(id).populate("owner");
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
  const {
    param: { id },
    session: { user },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { title: "Video not found." });
  }
  if (String(video.owner) !== String(user?._id)) {
    return res.status(403).redirect("/");
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
    const { user } = req.session;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).render("404", { title: "Video not found." });
    }
    if (String(video.owner) !== String(user?._id)) {
      return res.status(403).redirect("/");
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
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const { path: fileUrl } = req.file;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    await user.save();

    return res.redirect("/");
  } catch (e) {
    return res.render("upload", {
      title: "Upload Video",
      errorMessage: e._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;

  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { title: "Video not found." });
  }

  if (String(video.owner) !== String(user?._id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { title: "Search", videos });
};
