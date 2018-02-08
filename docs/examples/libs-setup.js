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
				name: '2.0.1',
				sriSrcJs: ''
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '2.0.0',
				sriSrcJs: 'sha384-1zk5CWpEe6wZLfNMx9dtQ6ufOPIFuIo81+o70mPeSn0zB7PHJ75320/oqaJzTnA2'
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.5',
				sriSrcJs: 'sha384-sxLYF/ic9xXT5JwaC4gIYVb1dvZv0X/UkNG/reTbFa4BhDc565gmpCYTvel3NAbH'
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.4',
				sriSrcJs: 'sha384-p6ZmgKEMi5Arp0HP2SHHPv6dLy7xGEOZ/lTs2d7zJ+bMhSXkSL2NiZ9HmR0o7vDT'
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.3',
				sriSrcJs: 'sha384-6TYuwjUDu5TULfMVo3zDBoq4A1M6mf2c5B3Vx0M021U5XBo5X1yRCiPhEd6ehLzP'
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.2',
				sriSrcJs: 'sha384-JSr6sT8nWUA5N+x4mJSl06cJYrp6sBctdejUY4rvNqoZrYFgMwIV2WNtkV4xqEJ9'
			}),
			// Versions 1.0.1, 1.0.0 and 0.1.0 are not published on npm, hence not available on unpkg CDN.
			// Use jsDelivr instead.
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.1',
				cdnPrefix: mcgLayerSupportPathPrefix2,
				sriSrcJs: 'sha384-FJQaGQXnYuu1OYarmQPkxN0Pch59iBfuBJ0mTJ5pywqpygf7LAZTxfLlsUTNCzrt'
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '1.0.0',
				cdnPrefix: mcgLayerSupportPathPrefix2,
				sriSrcJs: 'sha384-E+VopqhMO9iCgY5xNiU3awtEQfpaQw/+zwNTatVuEU3JATG71xaJK+pPz7zi5TO0'
			}),
			_makeMcgLayerSupportVersionAssets({
				name: '0.1.0',
				cdnPrefix: mcgLayerSupportPathPrefix2,
				sriSrcJs: 'sha384-Rr21NL2cibg9oFjKh99jXONofUFrSaCImut77LwsQU0TpepBBkeetsKGdSUyTg/X'
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
