const fs = require("node:fs");
const path = require("node:path");

const required = [
  "public/assets/css/app.css",
  "public/assets/js/app.js",
  "public/assets/js/map.js"
];

const missing = required.filter((p) => !fs.existsSync(path.join(process.cwd(), p)));
if (missing.length) {
  // eslint-disable-next-line no-console
  console.error("Missing required built/static assets:\n" + missing.map((m) => `- ${m}`).join("\n"));
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log("Assets look good.");

