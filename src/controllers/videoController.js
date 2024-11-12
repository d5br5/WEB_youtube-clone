const fakeUser = {
  username: "Doh",
  loggedIn: true,
};

export const trending = (req, res) => {
  const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
    h1: "Watch Video Page",
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
