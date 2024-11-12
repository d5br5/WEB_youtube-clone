const fakeUser = {
  username: "Doh",
  loggedIn: true,
};

let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 42,
    createdAt: "33 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 3.2,
    comments: 117,
    createdAt: "4 hours ago",
    views: 22,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 4,
    comments: 94,
    createdAt: "2 minutes ago",
    views: 1,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", {
    title: "Home",
    h1: "Welcome Wetube Page!",
    user: fakeUser,
    videos,
  });
};

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => video.id == id);
  return res.render("watch", {
    title: "Watching Video:" + video.title,
    user: fakeUser,
    video,
  });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => video.id == id);
  return res.render("edit", {
    title: `Editing: ${video.title}`,
    h1: `Edit video: ${video.title}`,
    user: fakeUser,
    video,
  });
};

export const postEdit = (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  const video = videos.find((video) => video.id == id);
  video.title = title;
  return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { user: fakeUser, title: "Upload Video" });
};

export const postUpload = (req, res) => {
  // here we will add a video to the videos array
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};

export const remove = (req, res) => {
  return res.send("Remove Video");
};

export const search = (req, res) => {
  return res.send("Search Video");
};
