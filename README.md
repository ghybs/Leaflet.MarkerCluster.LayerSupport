<!-- ##########################################################################
NOTE TO CONTRIBUTOR:
this README is automatically generated from build/readme.template.md.
Should you need to modify the README, please make your modifications on
the template file.
########################################################################### -->

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

Size: 6 kB minified, < 2 kB gzipped.


**NOTE:** _if your usage requires only compatibility of MCG with
[L.Control.Layers](http://leafletjs.com/reference.html#control-layers),
you might be interested in this more simple plugin:
[Leaflet.FeatureGroup.SubGroup](https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup)._


## Requirements
- Requires Leaflet 1.x.x
- [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) plugin, version 1.0.0+
- For Leaflet 0.7.x use the [`v0.1.0` release](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/releases/tag/v0.1.0) or the [`leaflet-0.7` branch](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/tree/leaflet-0.7)


## Demos
- [LayerSupport with standard L.Control.Layers](https://ghybs.github.io/Leaflet.MarkerCluster.LayerSupport/examples/mcgLayerSupport-controlLayers-realworld.388.html)
- [LayerSupport with LeafletSlider plugin](https://ghybs.github.io/Leaflet.MarkerCluster.LayerSupport/examples/mcgLayerSupport-leafletslider.html)


## Usage instructions

### Quick Guide
**HTML:**
```html
<!-- After Leaflet and Leaflet.markercluster scripts -->
<script src="leaflet.markercluster.layersupport.js"></script>
```

**JavaScript:**
```javascript
var map = L.map("map"),
    mcgLayerSupportGroup = L.markerClusterGroup.layerSupport(options),
    myLayerGroup = L.layerGroup(arrayOfMarkers);
    
mcgLayerSupportGroup.addTo(map);
mcgLayerSupportGroup.checkIn(myLayerGroup); // <= this is where the magic happens!

myLayerGroup.addTo(map);
```

Now adding the Layer Group to the map adds clustered markers!

Works also with individual markers, so this means it should virtually be compatible
with any plugin that adds to / removes markers from map (e.g. [LeafletSlider](https://github.com/dwilhelm89/LeafletSlider)).


### Installing the sub-plugin

#### Local copy
1. Download the "<a href="https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/releases/download/v2.0.1/leaflet.markercluster.layersupport.js">`leaflet.markercluster.layersupport.js`</a>" file from the [`v2.0.1` release](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/releases/tag/v2.0.1).
2. Place the file alongside your page.
3. Add the `script` tag (see [Quick Guide > HTML](#quick-guide)) to your page after Leaflet and Leaflet.markercluster scripts.

#### CDN
You can alternatively use the free [unpkg](https://unpkg.com) CDN service, but keep in mind that it
"[_is a free, best-effort service and cannot provide any uptime or support guarantees_](https://unpkg.com/#/about)".

```html
<!-- After Leaflet and Leaflet.markercluster scripts -->
<script src="https://unpkg.com/leaflet.markercluster.layersupport@2.0.1/dist/leaflet.markercluster.layersupport.js"></script>
```

#### npm
1. Add this package to your project:
    ```bash
    $ npm install leaflet.markercluster.layersupport --save
    ```

2. If you are using a bundling tool, import in your JavaScript.
It only performs the side effect of attaching to the global `L` namespace,
so you do not need to store it into a local variable or import a namespace.
    ```javascript
    require('leaflet.markercluster.layersupport');
    // Or with ES6:
    import 'leaflet.markercluster.layersupport';
    ```


### Creation
Simply use the `L.markerClusterGroup.layerSupport` factory instead of your regular `L.markerClusterGroup`:

```javascript
var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport(options);

mcgLayerSupportGroup.addTo(map);
```

Do not forget to add it to your map.


### Adding and removing Markers / Layer Groups
Use the regular MCG methods (like `addLayer`, `addLayers`, etc.) to add Markers
and/or Layer Groups to the MCG Layer Support group and to show them on to the
map at the same time.

Layer Support provides 2 new methods `checkIn` and `checkOut` that do the same
but do not show right away the passed Markers and/or Layer Groups on to the map.
They accept a single layer or an array of layers.

Adding will automatically check in.

Check out will automatically remove from map.


### Dynamically add to and remove from map while clustering
Once Markers and/or Layer Groups are added (or checked in) to the MCG Layer
Support group, you can then directly add and remove them from the map; all child
Markers will be added to or removed from the group, as if you had called
`group.addLayer` (or `group.removeLayer`) instead.

**This means that other Leaflet plugins (including standard Layers Control) that
dynamically add to or remove markers from the map are now compatible with the
clustering functionality!**

For example, you can now gather Markers into several Layer Groups and use them
as Overlays in L.Control.Layers: when ticking / un-ticking the Overlay name in
the Control, markers will automatically cluster / be removed.



## API Reference

### Options
| Option  | Type  | Default | Description |
| :------ | :-----| :------ | :---------- |
| **singleAddRemoveBufferDuration** | `Number` | `0` | Gathers all calls to `addLayer` and `removeLayer` single operations (on this MCG) that happen during the specified duration (in ms) for batch processing. Similar to throttling with execution on trailing edge only. Use `0` to disable throttling. Disabled by default (see [#11](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/issues/11)) |


### Methods
| Method  | Returns  | Description |
| :------ | :------- | :---------- |
| **checkIn**( `<ILayer>` or `<ILayer[]>` layers ) | `this` | Stamps the given Marker(s) or Layer Group(s) so that whenever they are added to or removed from the map later on, they are added to or removed from this group instead. If they are already on a map when `checkIn` is called, but they do not belong to this group yet, they are removed from that map. |
| **checkOut**( `<ILayer>` or `<ILayer[]>` layers ) | `this` | Un-Stamps the given Marker(s) or Layer Group(s) so that they retrieve their normal behaviour. Also removes the layers from the map. |

MCG Layer Support does not provide any extra event.


### Regular MCG options, events and methods
All regular MCG [options](https://github.com/Leaflet/Leaflet.markercluster#all-options),
[events](https://github.com/Leaflet/Leaflet.markercluster#events) and
[methods](https://github.com/Leaflet/Leaflet.markercluster#methods) are
available within MCG Layer Support. Refer to Leaflet.markercluster documentation.

| Method  | Returns  | Description |
| :------ | :------- | :---------- |
| addLayer and addLayers | `this` | Check in all passed layers, besides the normal behaviour. |
| removeLayer and removeLayers | `this` | Normal behaviour only. They do not check out layers. |



## Limitations

### No clustering before at least one MCG Layer Support group has been added to map
As long as **no** MCG Layer Support group has been added to a given map, the
latter will not be able to redirect calls to `addLayer` to the appropriate Layer
Support group, even if you have properly checked in all Markers and Layer Groups.
They will appear on the map without clustering. Once you add an MCG Layer Support
group, it will collect its layers and re-add them properly clustered.

After that, markers already added on map will be collected by their respective
Layer Support group once the latter are added to the map.

Later additions of checked in markers to the map will not show anything as long
as the Layer Support group they belong to is not on map. If it is on map, then
they show up normally (clustered).


### Checked in Layer Group with child checked out marker
Refrain from doing the following: check in a Layer Group into an MCG Layer
Support group (this checks in all child markers of that group) then check out
one or several of the child markers individually.

The result is simple: when adding the Layer Group to the map, all child markers
but the checked out ones will cluster. Checked out ones will be directly added
to the map, without clustering. What did you expect? :-)

## License
[![license](https://img.shields.io/github/license/ghybs/leaflet.markercluster.layersupport.svg)](LICENSE)

Leaflet.MarkerCluster.LayerSupport is distributed under the
[MIT License](http://choosealicense.com/licenses/mit/) (Expat type), like
Leaflet.markercluster.
