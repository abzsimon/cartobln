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

function multivaluedItems (item, position) {
    let toLi = item.split(",")
    for (e of toLi) {
        let newTag = document.createElement('div')
        newTag.setAttribute('class', 'tag')
        newTag.textContent = e;
        document.querySelector(position).appendChild(newTag)
    }
}

function guides (src,p) {
    for (let i = 0; i < src.length; i++) {
        let newTag = document.createElement('div');
        newTag.setAttribute('class', 'guide');
        newTag.innerHTML = `
            <img src="${src[i]}"/>
            <div class="guide-bio">${p[i]}</div>
        `;
        document.querySelector('#guides').appendChild(newTag);
    }   
}

// fetch le json en asynchrone, seule solution qui marche côté js client mais avec async + facile (conseil de Victor)
async function generatePoints() {
  const response = await fetch("data.json");
  const data = await response.json ();
  console.log(data[17].guide_bio[0])
  for (let e of data) {
    let popupContent = `
            <p style="color:darksalmon; font-weight:bolder";>${e.name}</p>
            ${e.loc_string}
            `;
    let marker = L.marker(e.loc).addTo(map);
    marker.bindPopup(popupContent).openPopup();
    marker.on("click", function () {
        document.querySelector('#keywords').innerHTML = ''
        document.querySelector('#communities').innerHTML = ''
        document.querySelector('#timeline').innerHTML = ''
        document.querySelector('#isNow').innerHTML = ''
        document.querySelector('#guides').innerHTML = ''
        multivaluedItems(e.keywords, '#keywords')
        multivaluedItems(e.community, '#communities')
        multivaluedItems(e.timeline, '#timeline')
        multivaluedItems(e.is_now, '#isNow')
        document.querySelector("#description").innerHTML = e.place_desc
        document.querySelector("#street").innerHTML = e.place_pic
        guides(e.guide_pic,e.guide_bio)
    });
  }
}

generatePoints();
