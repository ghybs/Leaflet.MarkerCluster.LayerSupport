/*
 This script prepares the demo /debug page.
 It assumes that urijs, load-js-css, manage-libs-versions and local libs-setup (which exports `bundle1` to global scope)
 are already executed.
 It also expects that the demo page defines `global.pageAssets` as an array of asset specs (for load-js-css).
 */
(function (global) {

	var bundle1 = global.bundle1;

	bundle1.fillPlaceholders();

// Check for availability of local version.
// It is absent from repository, therefore in online mode.
// In development mode, it is available if developer has built the dist file(s).
	var localVersion = bundle1.getLibVersion('leaflet.markercluster.layersupport', 'local');

	if (localVersion) {
		localVersion.checkAssetsAvailability(true)
				.then(function () {
					console.log('LOCAL version found');
					load();
				})
				.catch(function () {
					var version200 = bundle1.getLibVersion('leaflet.markercluster.layersupport', '2.0.0');

					if (version200) {
						version200.defaultVersion = true;
					}

					load();
				});
	} else {
		load();
	}



	function load() {
		// Retrieve the requested versions from browser address bar.
		var url = window.location.href;
		// https://github.com/medialize/URI.js
		var urlParts = URI.parse(url);
		var queryStringParts = URI.parseQuery(urlParts.query);
		// https://github.com/ghybs/manage-libs-versions
		var list = bundle1.getAndSelectVersionsAssetsList(queryStringParts);

		// Finally load the page asset(s), now that Leaflet, Leaflet.markercluster and the plugin are available.
		var pageAssets = global.pageAssets;

		if (pageAssets) {
			if (pageAssets instanceof Array) {
				list = list.concat(pageAssets);
			} else {
				list.push(pageAssets);
			}
		}

		console.log(list);

		// https://github.com/ghybs/load-js-css
		loadJsCss.list(list, {
			delayScripts: 500 // Load scripts after stylesheets, delayed by this duration (in ms).
		});
	}


////////////////////////////////////////////////////////
	document.getElementById('reload').addEventListener('click', function (event) {
		event.preventDefault();

		var bundleVersions = bundle1.readSelectedVersionsNames();
		var url = new URI(window.location.href).setQuery(bundleVersions);

		window.location.href = url.toString();
	});

})(this);
