(function (global) {

	var cdn = 'https://unpkg.com/';
	var versionPlaceholder = '@{{VERSION}}/';
	var libName = 'leaflet.markercluster.layersupport';

	var mcgLayerSupportPathPrefix = cdn + libName + versionPlaceholder + 'dist/';

	var cdn2 = 'https://cdn.jsdelivr.net/';
	// https://www.jsdelivr.com/features
	// Template: https://cdn.jsdelivr.net/gh/user/repo@version/file
	// Note: versions not published on npm (1.0.1, 1.0.0, 0.1.0) were not built, therefore the src file is not in a `dist/` folder.
	var mcgLayerSupportPathPrefix2 = cdn2 + 'gh/ghybs/' + libName + versionPlaceholder;

	var libs = [
		global.libLeafletVersions, // Assumes that "leaflet-versions.js" file has already been executed, so that libLeafletVersions is globally available.
	];

	// In case libLeafletMarkerClusterVersions is also globally available.
	if (global.libLeafletMarkerClusterVersions) {
		libs.push(global.libLeafletMarkerClusterVersions);
	}

	// In case extra libraries must be loaded as well.
	if (global.extraLibs) {
		libs = libs.concat(global.extraLibs);
	}

	// Plugin library.
	libs.push({
		name: libName,
		mandatory: true,
		versions: [
			// You can use https://www.srihash.org/ to generate the SRI hash.
			_makeMcgLayerSupportVersionAssets({
				name: '2.0.0',
				sriSrcJs: ''
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.5',
				sriSrcJs: ''
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.4',
				sriSrcJs: ''
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.3',
				sriSrcJs: ''
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.2',
				sriSrcJs: ''
			}),
			// Versions 1.0.1, 1.0.0 and 0.1.0 are not published on npm, hence not available on unpkg CDN.
			// Use jsDelivr instead.
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.1',
				cdnPrefix: mcgLayerSupportPathPrefix2,
				sriSrcJs: ''
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.0',
				cdnPrefix: mcgLayerSupportPathPrefix2,
				sriSrcJs: ''
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '0.1.0',
				cdnPrefix: mcgLayerSupportPathPrefix2,
				sriSrcJs: ''
			}),
			{
				name: 'local',
				defaultVersion: true,
				disabled: true, // Will be enabled if assets are found to be available at runtime (use `checkAssetsAvailability`).
				assets: [{
					type: 'script',
					path: '../../dist/leaflet.markercluster.layersupport-src.js'
				}]
			}
		]
	});


	// To be executed after manage-libs-versions is ready.
	// https://github.com/ghybs/manage-libs-versions
	// https://www.npmjs.com/package/manage-libs-versions
	global.bundle1 = new manageLibsVersions.Bundle({
		name: 'bundle1',
		libs: libs
	});


	function _makeMcgLayerSupportVersionAssets(options) {
		var versionName = options.name;
		var cdnPrefix = options.cdnPrefix || mcgLayerSupportPathPrefix;

		return {
			name: versionName,
			defaultVersion: options.defaultVersion,
			disabled: options.disabled,
			assets: [
				manageLibsVersions.makeScript(cdnPrefix + 'leaflet.markercluster.layersupport-src.js', versionName, options.sriSrcJs)
			]
		};
	}

})(this);
