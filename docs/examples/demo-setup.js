/*
 This script prepares the demo /debug page.
 It assumes that urijs, load-js-css, manage-libs-versions and local libs-setup (which exports `bundle1` to global scope)
 are already executed.
 It also expects that the demo page defines `global.pageAssets` as an array of asset specs (for load-js-css).
 */
(function (global) {

	////////////////////////////////////////////////////////
	// Fill HTML versions selection table first.
	////////////////////////////////////////////////////////

	// Build the table if placeholder is found.
	var versionsSelectionTable = document.getElementById('versionsSelectionTable');

	if (versionsSelectionTable) {
		versionsSelectionTable.innerHTML =
				'<table class="buttonsTable">\n' +
				'\t<tr>\n' +
				'\t\t<th>Leaflet</th>\n' +
				'\t\t<th>Leaflet.markercluster</th>\n' +
				'\t\t<th>Leaflet.MarkerCluster.LayerSupport</th>\n' +
				'\t</tr>\n' +
				'\t<tr>\n' +
				'\t\t<td id="leaflet1"></td>\n' +
				'\t\t<td id="mcg1"></td>\n' +
				'\t\t<td id="layersupport1"></td>\n' +
				'\t</tr>\n' +
				'\t<tr>\n' +
				'\t\t<td id="leaflet0"></td>\n' +
				'\t\t<td id="mcg0"></td>\n' +
				'\t\t<td id="layersupport0"></td>\n' +
				'\t</tr>\n' +
				'</table>';
	}

	// Fill the cells if placeholders are found.
	var selectionCellIds = ['leaflet1', 'mcg1', 'layersupport1', 'leaflet0', 'mcg0', 'layersupport0'];

	selectionCellIds.forEach(_fillVersionSelectionCell);

	// Add the reload button if placeholder is found.
	var reloadButton = document.getElementById('reloadButton');

	if (reloadButton) {
		reloadButton.innerHTML =
				'<br />\n' +
				'\n' +
				'<button id="reload">Reload with the above versions</button>\n' +
				'\n' +
				'<br />\n' +
				'\n' +
				'<p>Note: local version is available only in local development and if dist files have been built.</p>';
	}


	function _fillVersionSelectionCell(cellId) {
		var cell = document.getElementById(cellId);

		if (cell) {
			switch (cellId) {
				case 'leaflet1':
					// For syntax, see https://github.com/ghybs/manage-libs-versions
					cell.innerHTML =
							'\t\t\t<div\n' +
							'\t\t\t\t\tdata-manage-lib="leaflet"\n' +
							'\t\t\t\t\tdata-manage-versions="master, 1.3.1, 1.3.0, 1.2.0, 1.1.0, 1.0.3, 1.0.2, 1.0.1, 1.0.0"\n' +
							'\t\t\t></div>\n\t\t';
					break;
				case 'mcg1':
					cell.innerHTML =
							'\t\t\t<div\n' +
							'\t\t\t\t\tdata-manage-lib="leaflet.markercluster"\n' +
							'\t\t\t\t\tdata-manage-versions="1.3.0, 1.2.0, 1.1.0, 1.0.6, 1.0.5, 1.0.4, 1.0.3, 1.0.2, 1.0.1, 1.0.0"\n' +
							'\t\t\t></div>\n\t\t';
					break;
				case 'layersupport1':
					cell.innerHTML =
							'\t\t\t<div\n' +
							'\t\t\t\t\tdata-manage-lib="leaflet.markercluster.layersupport"\n' +
							'\t\t\t\t\tdata-manage-versions="local, 2.0.1, 2.0.0, 1.0.5, 1.0.4, 1.0.3, 1.0.2, 1.0.1, 1.0.0"\n' +
							'\t\t\t></div>\n\t\t';
					break;
				case 'leaflet0':
					cell.innerHTML =
							'\t\t\t<div\n' +
							'\t\t\t\t\tdata-manage-lib="leaflet"\n' +
							'\t\t\t\t\tdata-manage-versions="0.7.7"\n' +
							'\t\t\t></div>\n\t\t';
					break;
				case 'mcg0':
					cell.innerHTML =
							'\t\t\t<div\n' +
							'\t\t\t\t\tdata-manage-lib="leaflet.markercluster"\n' +
							'\t\t\t\t\tdata-manage-versions="0.5.0"\n' +
							'\t\t\t></div>\n\t\t';
					break;
				case 'layersupport0':
					cell.innerHTML =
							'\t\t\t<div\n' +
							'\t\t\t\t\tdata-manage-lib="leaflet.markercluster.layersupport"\n' +
							'\t\t\t\t\tdata-manage-versions="0.1.0"\n' +
							'\t\t\t></div>\n\t\t';
					break;
				default:
					console.log('Unknown cell identifier: ' + cellId);
			}
		} else {
			console.log('Could not find Version Selection Cell with id: ' + cellId);
		}
	}


	////////////////////////////////////////////////////////
	// Now use manage-libs-versions.
	////////////////////////////////////////////////////////

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
					var versionLatest = bundle1.getLibVersion('leaflet.markercluster.layersupport', '2.0.1');

					if (versionLatest) {
						versionLatest.defaultVersion = true;
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
