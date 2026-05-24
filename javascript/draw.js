// Create a layer group to store the drawn shapes
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

// Add the drawing control to the map
var drawControl = new L.Control.Draw({
    draw: {
        polygon: true,
        polyline: true,
        rectangle: true,
        circle: true,
        marker: false  // Enable point drawing as CircleMarker
    },
    edit: {
        featureGroup: editableLayers
    }
});
map.addControl(drawControl);

// Add an event to handle the creation of new shapes
map.on(L.Draw.Event.CREATED, function (e) {
    var layer = e.layer;

     // Set style for circles
     if (e.layerType === 'circle') {
        layer.setStyle({
            color: 'yellow',       // Circle border color
            fillColor: 'orange',   // Green fill color
            fillOpacity: 0.5       // Set fill opacity
        });
    }

    // Set style for polygons
    if (e.layerType === 'polygon') {
        layer.setStyle({
            color: 'lime',       // Polygon border color
            fillColor: 'lime',   // Green fill color
            fillOpacity: 0.5     // Set fill opacity
        });
    }

    // Set style for polylines
    if (e.layerType === 'polyline') {
        layer.setStyle({
            color: 'lime'        // Polyline color
        });
    }

    // Set style for rectangles
    if (e.layerType === 'rectangle') {
        layer.setStyle({
            color: 'lime',       // Rectangle border color
            fillColor: 'lime',   // Green fill color
            fillOpacity: 0.5     // Set fill opacity
        });
    }

    // Set style for CircleMarker
    if (e.layerType === 'circlemarker') {
        layer.setStyle({
            radius: 5,            // Set a smaller circle size (5-pixel radius)
            color: 'violet',      // Circle border color
            fillColor: 'violet',  // Green fill color
            fillOpacity: 1        // Set fill opacity
        });
    }

    editableLayers.addLayer(layer);
});