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
    title: "Watch",
    user: fakeUser,
    video,
  });
};

export const edit = (req, res) => {
  return res.render("edit", {
    title: "Edit",
    h1: "Edit your video",
    user: fakeUser,
  });
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
