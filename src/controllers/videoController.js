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
  return res.redirect(`/video/${id}`);
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
      hashtags: hashtags
        .split(",")
        .map((word) => word.trim()) // 콤마 앞뒤의 공백 제거
        .filter((word) => word.length > 0) // 빈 문자열 제외
        .map((word) => `#${word}`), // 해시태그 처리
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
