# Leaflet.MarkerCluster.LayerSupport Changelog


## 2.0.1 (2018-02-08) for Leaflet 1.x

- Fix `checkOut` not properly cleaning Layer Groups ([#14](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/issues/14)).


## 2.0.0 (2018-02-06) for Leaflet 1.x

- **Breaking change:** `singleAddRemoveBufferDuration` option now defaults to `0`
(i.e. it is disabled) instead of `100` ms previously.
Fix this plugin breaking `marker.setLatLng()` ([#11](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/issues/11))
and making `addLayer` unexpectedly asynchronous ([#12](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/issues/12)).


## 1.0.5 (2017-07-19) for Leaflet 1.x

- Fix throttling different operation types (i.e. mixed `addLayer` and `removeLayer`) [#10](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/pull/10) (by [AsamK](https://github.com/AsamK))
- Docs: update debug and demo pages to Leaflet 1.1.0 and Leaflet.markercluster 1.0.6.


## 1.0.4 (2017-05-13) for Leaflet 1.0

- Fix use of `addLayers`, `removeLayers` and therefore `chunkedLoading` option ([#8](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/issues/8)).
- Add build script for README.
- Move _gh-pages_ from `gh-pages` branch (deleted) to `master` branch's `/docs` folder.


## 1.0.3 (2016-12-19) for Leaflet 1.0

- Fix duplicate UMD wrapper.


## 1.0.2 (2016-11-24) for Leaflet 1.0

- Added build script, including a minified version of the plugin.
- Improved UMD wrapper (fix [#7](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/issues/7)).
- Published to npm.


## 1.0.1 (2016-09-02) for Leaflet 1.0

Compatible with Leaflet 1.0.0 and Leaflet.markercluster 1.0.0

- Fix events when removing layers [#6](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/issues/6)


## 0.1.0 (2016-09-02) for Leaflet 0.7

Compatible with Leaflet 0.7.x and Leaflet.markercluster 0.5.x.


## 1.0.0 (2016-06-25) for Leaflet 1.0

First release

- Compatibility with Leaflet 1.0 [#4](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/pull/4) (by [rey-awesense](https://github.com/rey-awesense))
