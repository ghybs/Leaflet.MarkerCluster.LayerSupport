var sliderControl = null;

var map = L.map('map').setView([51.9, 7.9], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//Fetch some data from a GeoJSON file
$.getJSON("points.json", function(json) {

	var testlayer = L.geoJson(json);

	// Check into MCG Layer Support!
	// Add to map first before checking in.
	L.markerClusterGroup.layerSupport().addTo(map).checkIn(testlayer);

	var sliderControl = L.control.sliderControl({
		position: "topright",
		layer: testlayer,
		range: true
	});

	//Make sure to add the slider to the map ;-)
	map.addControl(sliderControl);
	//And initialize the slider
	sliderControl.startSlider();
});
