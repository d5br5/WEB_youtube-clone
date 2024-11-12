const fakeUser = {
  username: "Doh",
  loggedIn: true,
};

export const trending = (req, res) => {
  const videos = [
    {
      title: "First Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "Second Video",
      rating: 5,
      comments: 1,
      createdAt: "2 minutes ago",
      views: 59,
      id: 2,
    },
    {
      title: "Third Video",
      rating: 5,
      comments: 3,
      createdAt: "2 minutes ago",
      views: 59,
      id: 3,
    },
  ];
  return res.render("home", {
    title: "Home",
    h1: "Welcome Wetube Page!",
    user: fakeUser,
    videos,
  });
};

export const see = (req, res) => {
  return res.render("watch", {
    title: "Watch",
    h1: `Watch Video (id: ${req.params.id})`,
    user: fakeUser,
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
