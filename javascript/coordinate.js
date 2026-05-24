// Selecting the element to display the coordinates
var coordinatesDisplay = document.getElementById('coordinates');

// Event to capture the mouse coordinates
map.on('mousemove', function (e) {
    var lat = e.latlng.lat.toFixed(2);
    var lng = e.latlng.lng.toFixed(2);
    coordinatesDisplay.innerHTML = `Latitude: ${lat}, Longitude: ${lng}`;
});
