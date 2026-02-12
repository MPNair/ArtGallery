const dataService = require("../services/dataService");

function nav() {
  return [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/exhibitions", label: "Exhibitions" },
    { href: "/contact", label: "Contact" }
  ];
}

async function galleryIndex(req, res, next) {
  try {
    const artworks = await dataService.getArtworks();

    res.render("pages/gallery", {
      meta: {
        title: "Gallery",
        description:
          "An immersive gallery with gentle transitions and elegant overlays."
      },
      nav: nav(),
      artworks
    });
  } catch (err) {
    next(err);
  }
}

async function galleryDetail(req, res, next) {
  try {
    const slug = String(req.params.slug || "");
    const artwork = await dataService.getArtworkBySlug(slug);
    if (!artwork) {
      const err = new Error("Artwork not found");
      err.status = 404;
      throw err;
    }

    res.render("pages/artwork", {
      meta: {
        title: `${artwork.title} — Gallery`,
        description: artwork.seoDescription || artwork.description?.slice(0, 160)
      },
      nav: nav(),
      artwork
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  galleryIndex,
  galleryDetail
};

