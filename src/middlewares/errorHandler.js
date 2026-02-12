function errorHandler(err, req, res, next) {
  const status = Number(err?.status || 500);
  const message =
    status === 404
      ? "Not found."
      : "Something went wrong. Please try again shortly.";

  const logPayload = {
    status,
    message: err?.message,
    path: req.originalUrl
  };

  // eslint-disable-next-line no-console
  console.error("Unhandled error", logPayload);

  if (res.headersSent) return next(err);

  res.status(status).render("pages/error", {
    meta: {
      title: status === 500 ? "Server Error" : "Error",
      description: message
    },
    status,
    message
  });
}

module.exports = { errorHandler };

