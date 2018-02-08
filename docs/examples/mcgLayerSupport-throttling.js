var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
		}),
		latlng = L.latLng(-37.82, 175.24);


var map = L.map('map', {center: latlng, zoom: 13, layers: [tiles]});

var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport({
			singleAddRemoveBufferDuration: 100 // Make sure to specify a throttling duration because since 2.0.0, it is disabled by default.
		}),
		marker = L.marker(latlng);

mcgLayerSupportGroup.addTo(map);

// Set-up buttons.

document.getElementById("throttling").addEventListener("click", function () {
	// Note: throttling is implemented only with calls to `addLayer` and `removeLayer` on the MCG.layerSupport, not on the map.
	mcgLayerSupportGroup.addLayer(marker);
	console.log('Marker added');
	mcgLayerSupportGroup.removeLayer(marker);
	console.log('Marker removed');

	setTimeout(function () {
		mcgLayerSupportGroup.addLayer(marker);
		console.log('Marker added after delay 30ms');
	}, 30);

	setTimeout(function () {
		mcgLayerSupportGroup.removeLayer(marker);
		console.log('Marker removed after delay 60ms');
	}, 60);
});
