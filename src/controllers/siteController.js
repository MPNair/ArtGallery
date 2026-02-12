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

async function home(req, res, next) {
  try {
    const artworks = await dataService.getArtworks();
    const featured = artworks.filter((a) => a.featured).slice(0, 8);

    res.render("pages/home", {
      meta: {
        title: "ArtGallery — A Quiet Exhibition",
        description:
          "An atmospheric, minimal dark-luxury gallery experience. Explore featured works and immersive stories."
      },
      nav: nav(),
      featured
    });
  } catch (err) {
    next(err);
  }
}

async function about(req, res, next) {
  try {
    const artist = await dataService.getArtist();

    res.render("pages/about", {
      meta: {
        title: "About — The Artist",
        description:
          "A curated storytelling section with portrait and poetic biography."
      },
      nav: nav(),
      artist
    });
  } catch (err) {
    next(err);
  }
}

async function exhibitions(req, res, next) {
  try {
    const exhibitionsRaw = await dataService.getExhibitions();
    const exhibitions = exhibitionsRaw
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    res.render("pages/exhibitions", {
      meta: {
        title: "Exhibitions — Curated Seasons",
        description:
          "Chronologically curated exhibitions, conceived by Mp Nair as slow, luminous seasons of looking across Florence, London, Rome, Berlin, and beyond."
      },
      nav: nav(),
      exhibitions
    });
  } catch (err) {
    next(err);
  }
}

async function contact(req, res) {
  res.render("pages/contact", {
    meta: {
      title: "Contact",
      description:
        "Inquiries, acquisition requests, exhibition collaborations, and private viewings."
    },
    nav: nav(),
    sent: false
  });
}

async function contactSubmit(req, res) {
  // No database/email by design. We render a thank-you state.
  res.status(200).render("pages/contact", {
    meta: {
      title: "Contact",
      description:
        "Inquiries, acquisition requests, exhibition collaborations, and private viewings."
    },
    nav: nav(),
    sent: true,
    form: {
      name: String(req.body?.name || ""),
      email: String(req.body?.email || ""),
      message: String(req.body?.message || "")
    }
  });
}

async function map(req, res, next) {
  try {
    const museums = await dataService.getMuseums();

    res.render("pages/map", {
      meta: {
        title: "Map — Museums",
        description:
          "A modern antique-style map: parchment textures, engraved typography, and glassmorphism museum cards."
      },
      nav: nav(),
      museums
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  home,
  about,
  exhibitions,
  contact,
  contactSubmit,
  map
};

