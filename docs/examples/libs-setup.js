(function (global) {

  var cdn = 'https://unpkg.com/';
  var versionPlaceholder = '@{{VERSION}}/';

  var mcgLayerSupportPathPrefix = cdn + 'leaflet.markercluster.layersupport' + versionPlaceholder + 'dist/';

  var libs = [
    global.libLeafletVersions, // Assumes that "leaflet-versions.js" file has already been executed, so that libLeafletVersions is globally available.
  ];

  // In case libLeafletMarkerClusterVersions is also globally available.
  if (global.libLeafletMarkerClusterVersions) {
    libs.push(global.libLeafletMarkerClusterVersions);
  }

  // Plugin library.
  libs.push({
    name: 'leaflet.markercluster.layersupport',
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
      // Versions 1.0.1, 1.0.0 and 0.1.0 are not published on npm, hence not available on CDN.
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

    return {
      name: versionName,
      defaultVersion: options.defaultVersion,
      disabled: options.disabled,
      assets: [
        manageLibsVersions.makeScript(mcgLayerSupportPathPrefix + 'leaflet.markercluster.layersupport-src.js', versionName, options.sriSrcJs)
      ]
    };
  }

})(this);
