const fs = require("node:fs/promises");
const path = require("node:path");

const dataDir = path.join(__dirname, "..", "data");

async function readJson(fileName) {
  const filePath = path.join(dataDir, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function getArtworks() {
  const data = await readJson("artworks.json");
  return data?.artworks || [];
}

async function getArtworkBySlug(slug) {
  const artworks = await getArtworks();
  return artworks.find((a) => a.slug === slug) || null;
}

async function getArtist() {
  return await readJson("artist.json");
}

async function getExhibitions() {
  const data = await readJson("exhibitions.json");
  return data?.exhibitions || [];
}

async function getMuseums() {
  const data = await readJson("museums.json");
  return data?.museums || [];
}

module.exports = {
  getArtworks,
  getArtworkBySlug,
  getArtist,
  getExhibitions,
  getMuseums
};

