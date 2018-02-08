# Leaflet.MarkerCluster.LayerSupport
Sub-plugin for [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
plugin (MCG in short); brings compatibility with
[L.Control.Layers](http://leafletjs.com/reference.html#control-layers)
and other Leaflet [plugins](http://leafletjs.com/plugins.html).
I.e. everything that uses direct calls to `map.addLayer` and `map.removeLayer`.

[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) plugin
provides beautiful animated Marker Clustering functionality.

[Leaflet](http://leafletjs.com/) is the leading open-source JavaScript library
for mobile-friendly interactive maps.

[![GitHub releases](https://img.shields.io/github/release/ghybs/leaflet.markercluster.layersupport.svg?label=GitHub)](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/releases)
[![npm](https://img.shields.io/npm/v/leaflet.markercluster.layersupport.svg)](https://www.npmjs.com/package/leaflet.markercluster.layersupport)
[![license](https://img.shields.io/github/license/ghybs/leaflet.markercluster.layersupport.svg)](LICENSE)


[https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport)


**NOTE:** _if your usage requires only compatibility of MCG with
[L.Control.Layers](http://leafletjs.com/reference.html#control-layers),
you might be interested in this more simple plugin:
[Leaflet.FeatureGroup.SubGroup](https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup)._


## Demos
- [LayerSupport with standard L.Control.Layers](https://ghybs.github.io/Leaflet.MarkerCluster.LayerSupport/examples/mcgLayerSupport-controlLayers-realworld.388.html)
- [LayerSupport with LeafletSlider plugin](https://ghybs.github.io/Leaflet.MarkerCluster.LayerSupport/examples/mcgLayerSupport-leafletslider.html)


## Debug
- [Layers Control with 100k points for `chunkedLoading`](https://ghybs.github.io/Leaflet.MarkerCluster.LayerSupport/examples/mcgLayerSupport-controlLayers-realworld.100k.html)
- [Throttling](https://ghybs.github.io/Leaflet.MarkerCluster.LayerSupport/examples/mcgLayerSupport-throttling.html)
