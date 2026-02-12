function notFoundHandler(req, res) {
  res.status(404).render("pages/404", {
    meta: {
      title: "Not Found",
      description: "The requested page could not be found."
    },
    path: req.path
  });
}

module.exports = { notFoundHandler };

