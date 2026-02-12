const http = require("node:http");
const path = require("node:path");

const compression = require("compression");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const { notFoundHandler } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");

const siteRoutes = require("./routes/siteRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

dotenv.config();

const app = express();
app.disable("x-powered-by");

const isProd = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 3000);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(compression());
app.use(morgan(isProd ? "combined" : "dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "200kb" }));

app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "public", "assets"), {
    etag: true,
    maxAge: isProd ? "14d" : 0,
    immutable: isProd
  })
);
// External images are now copied to public/images/external during build/deployment
// and served via the general /images middleware below.
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "images"), {
    etag: true,
    maxAge: isProd ? "30d" : 0,
    immutable: isProd
  })
);

app.use("/", siteRoutes);
app.use("/", galleryRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const server = http.createServer(app);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`ArtGallery running on http://localhost:${port}`);
});

