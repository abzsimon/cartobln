// MAP

// initialize the map on the "map" div with a given center and zoom
let map = L.map("map", {
  center: [52.520007, 13.404954],
  zoom: 12,
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// DATA

//fonctions pour générer contenus latéraux gauche


// fetch le json en asynchrone, seule solution qui marche côté js client mais avec async + facile (conseil de Victor)
async function generatePoints() {
  const response = await fetch("data.json");
  const data = await response.json ();
  for (let e of data) {
    let popupContent = `
            <p style="color:darksalmon; font-weight:bolder";>${e.name}</p>
            ${e.loc_string}
            `;
    let marker = L.marker(e.loc).addTo(map);
    marker.bindPopup(popupContent).openPopup();
    marker.on("click", function () {
        console.log(e, marker.getLatLng());
        // marker.bindPopup("This is Paris!").openPopup(); // Open a popup on click
    });
  }
}

generatePoints();
