
// Initialize the map
var map = L.map('map', {
  center: [-27.2723, -50.2515],
  zoom: 7
});

// Add multiple base maps
var baseMaps = {
  "Street Map (ArcGIS)": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Author: Bruna Borges da Rocha'
  }),
  "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Author: Bruna Borges da Rocha'
  }),
  "Esri_WorldImagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Author: Bruna Borges da Rocha'
  }),
};

// Add a default base layer
baseMaps["OpenStreetMap"].addTo(map);

// Layer control
L.control.layers(baseMaps).addTo(map);


// Variable to store the imported shapefile layer
let shapefileLayerGroup;

// Layer control to enable/disable layers
const overlayMaps = {};
const layerControl = L.control.layers(null, overlayMaps).addTo(map);

// Function to convert shapefile to GeoJSON
function handleShapefileUpload(file) {
  const reader = new FileReader();

  reader.onload = function(event) {
    const arrayBuffer = event.target.result;

    // Use JSZip to unzip the shapefile
    JSZip.loadAsync(arrayBuffer).then(function(zip) {
      const shpFile = zip.file(/.shp$/i)[0];
      const dbfFile = zip.file(/.dbf$/i)[0];

      if (shpFile && dbfFile) {
        Promise.all([shpFile.async("arraybuffer"), dbfFile.async("arraybuffer")])
          .then(function([shpBuffer, dbfBuffer]) {
            // Use the shapefile-js library to convert shapefile to GeoJSON
            shapefile.open(shpBuffer, dbfBuffer)
              .then(source => {
                // Create a layer group for the shapefile
                shapefileLayerGroup = L.featureGroup().addTo(map);

                const readNext = () => source.read().then(function(result) {
                  if (result.done) {
                    console.log('Shapefile fully loaded.');

                    // Add the layer group to the layer control
                    overlayMaps['Imported Shapefile'] = shapefileLayerGroup;
                    layerControl.addOverlay(shapefileLayerGroup, 'Imported Shapefile');

                    return;
                  }

                  const geojsonFeature = result.value;

                  // Add the GeoJSON to the layer group
                  shapefileLayerGroup.addLayer(L.geoJSON(geojsonFeature));

                  return readNext();
                });
                readNext();
              })
              .catch(function(error) {
                console.error("Error reading the shapefile:", error);//validation
              });
          });
      } else {
        console.error("Shapefile and/or DBF missing from the zip file.");//validation
      }
    }).catch(function(error) {
      console.error("Error unzipping the zip file:", error);//validation
    });
  };

  reader.readAsArrayBuffer(file);
}

// Listener for the import button
document.getElementById('importerBtn').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});

// File upload listener
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    handleShapefileUpload(file);
  }
});
