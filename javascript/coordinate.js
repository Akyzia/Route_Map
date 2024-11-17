
// Selecionando o elemento para exibir as coordenadas
var coordinatesDisplay = document.getElementById('coordinates');

// Evento para capturar as coordenadas do mouse
map.on('mousemove', function (e) {
    var lat = e.latlng.lat.toFixed(2);
    var lng = e.latlng.lng.toFixed(2);
    coordinatesDisplay.innerHTML = `Latitude: ${lat}, Longitude: ${lng}`;
});
