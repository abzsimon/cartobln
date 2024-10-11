// initialize the map on the "map" div with a given center and zoom
let map = L.map('map', {
    center: [52.520007, 13.404954],
    zoom: 12
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);