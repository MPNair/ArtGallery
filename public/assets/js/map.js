(() => {
  const el = document.getElementById("antiqueMap");
  if (!el) return;

  const museums = JSON.parse(el.getAttribute("data-museums") || "[]");

  // Leaflet is loaded via CDN in the map page
  const map = L.map("antiqueMap", {
    zoomControl: false,
    worldCopyJump: true
  }).setView([20, 0], 2);

  L.control.zoom({ position: "bottomright" }).addTo(map);

  // Contemporary data (OSM) + antique styling overlay (CSS + parchment texture)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  function museumCardHtml(m) {
    const safe = (x) => String(x ?? "");
    const website = safe(m.website);
    const websiteHtml = website
      ? `<a class="underline decoration-white/30 hover:decoration-white/70" href="${website}" target="_blank" rel="noreferrer">Visit website</a>`
      : "";

    return `
      <div class="museum-card">
        <div class="museum-title">${safe(m.name)}</div>
        <div class="museum-sub">${safe(m.city)}, ${safe(m.country)}</div>
        <div class="museum-focus">${safe(m.focus)}</div>
        <div class="museum-link">${websiteHtml}</div>
      </div>
    `;
  }

  // Ensure only one highlighted museum per country (first occurrence kept)
  const uniqueByCountry = [];
  const seenCountries = new Set();

  for (const m of museums) {
    const key = String(m.country || "").trim().toLowerCase();
    if (!key || !seenCountries.has(key)) {
      if (key) seenCountries.add(key);
      uniqueByCountry.push(m);
    }
  }

  const markers = uniqueByCountry.map((m) => {
    const icon = L.divIcon({
      className: "museum-marker",
      html: museumCardHtml(m),
      iconSize: [280, 160],
      iconAnchor: [140, 170]
    });
    const marker = L.marker([m.lat, m.lng], { icon, riseOnHover: true });
    marker.addTo(map);
    return marker;
  });

  function setMarkerVisibility() {
    const z = map.getZoom();
    const show = z >= 3;
    for (const marker of markers) {
      const node = marker.getElement()?.querySelector(".museum-card");
      if (node) node.classList.toggle("is-hidden", !show);
    }
  }

  map.on("zoomend", setMarkerVisibility);
  setMarkerVisibility();
})();

