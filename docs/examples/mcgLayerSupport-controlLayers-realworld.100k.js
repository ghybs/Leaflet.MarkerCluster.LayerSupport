var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
		}),
		latlng = L.latLng(-37.82, 175.24);


var map = L.map('map', {center: latlng, zoom: 13, layers: [tiles]});

var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');

var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport({
			chunkedLoading: true,
			chunkInterval: 100,
			chunkProgress: updateProgressBar
		}),
		control = L.control.layers(null, null, { collapsed: false });

var group1 = L.layerGroup(fillMarkerList(addressPoints)); // 25k points
var group2 = L.layerGroup(fillMarkerList(addressPoints2)); // 25k points
var group3 = L.layerGroup(fillMarkerList(addressPoints)); // 25k points
var group4 = L.layerGroup(fillMarkerList(addressPoints2)); // 25k points
//var superGroup = L.layerGroup([group1, group2, group3, group4]);

mcgLayerSupportGroup.addTo(map);

mcgLayerSupportGroup.checkIn([group1, group2, group3, group4]);

control.addOverlay(group1, 'First quarter');
control.addOverlay(group2, 'Second quarter');
control.addOverlay(group3, 'Third quarter');
control.addOverlay(group4, 'Fourth quarter');
//control.addOverlay(superGroup, 'Super Group');
control.addTo(map);

group1.addTo(map); // Adding to map or to AutoMCG are now equivalent.
group2.addTo(map);
group3.addTo(map);
group4.addTo(map);
//mcgLayerSupportGroup.addLayer(superGroup);

document.getElementById("add").addEventListener("click", function () {
	map.addLayer(mcgLayerSupportGroup);
});

document.getElementById("remove").addEventListener("click", function () {
	map.removeLayer(mcgLayerSupportGroup);
});

function updateProgressBar(processed, total, elapsed, layersArray) {
	console.log("updateProgressBar");
	if (elapsed > 200) {
		// if it takes more than a second to load, display the progress bar:
		progress.style.display = 'block';
		progressBar.style.width = Math.round(processed / total * 100) + '%';
	}
	if (processed === total) {
		// all markers processed - hide the progress bar:
		progress.style.display = 'none';
	}
}

function fillMarkerList(addressPointsSource) {
	var markerList = [];
	for (var i = 0; i < addressPointsSource.length; i++) {
		var a = addressPointsSource[i];
		var title = a[2];
		var marker = L.marker(L.latLng(a[0], a[1]), {
			title: title
		});
		marker.bindPopup(title);
		markerList.push(marker);
	}
	return markerList;
}
