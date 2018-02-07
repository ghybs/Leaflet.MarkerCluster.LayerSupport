var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    }),
    latlng = L.latLng(-37.82, 175.24),
    fullCount = addressPoints.length,
    quarterCount = Math.round(fullCount / 4);


var map = L.map('map', {center: latlng, zoom: 13, layers: [tiles]});

var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport(),
    group1 = L.layerGroup(),
    group2 = L.layerGroup(),
    group3 = L.layerGroup(),
    group4 = L.layerGroup(),
    control = L.control.layers(null, null, { collapsed: false }),
    i, a, title, marker;

mcgLayerSupportGroup.addTo(map);

for (i = 0; i < fullCount; i++) {
  a = addressPoints[i];
  title = a[2];
  marker = L.marker([a[0], a[1]], { title: title });
  marker.bindPopup(title);

  marker.addTo(i < quarterCount ? group1 : i < quarterCount * 2 ? group2 : i < quarterCount * 3 ? group3 : group4);
}

mcgLayerSupportGroup.checkIn([group1, group2, group3, group4]);

control.addOverlay(group1, 'First quarter');
control.addOverlay(group2, 'Second quarter');
control.addOverlay(group3, 'Third quarter');
control.addOverlay(group4, 'Fourth quarter');
control.addTo(map);

group1.addTo(map); // Adding to map or to AutoMCG are now equivalent.
group2.addTo(map);
group3.addTo(map);
group4.addTo(map);

// Set-up buttons.
var buttons = document.getElementsByTagName("button");

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", toggleGroup);
}

function toggleGroup(event) {
  var data = event.currentTarget.dataset,
      op = data.op,
      groupNo = data.group,
      group = groupNo == 1 ? group1 : groupNo == 2 ? group2 : groupNo == 3 ? group3 : group4;

  // Make sure the <button> has a `data-op` attribute before trying to execute an operation.
  if (op) {
    console.log(op + " " + groupNo);
    mcgLayerSupportGroup[op](group);
  }
}

document.getElementById("add").addEventListener("click", function () {
  map.addLayer(mcgLayerSupportGroup);
});

document.getElementById("remove").addEventListener("click", function () {
  map.removeLayer(mcgLayerSupportGroup);
});
