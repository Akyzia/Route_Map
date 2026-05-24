let waypoints = [];
let markers = []; // Array to store markers
let routes = [];  // Array to store routes
const apiKey = "5b3ce3597851110001cf6248b672d7dfdd9044b6870295558109340b";

// Function to add stops and calculate route
function addStop(latlng) {
  // Add marker to the map
  const marker = L.marker(latlng).addTo(map);
  markers.push(marker); // Store the marker

  waypoints.push([latlng.lat, latlng.lng]);

  // Calculate the route from the nearest point
  if (waypoints.length >= 2) {
    const nearestPoint = findNearestPoint(latlng, waypoints.slice(0, -1));
    getRoute(nearestPoint, latlng);
  }
}

// Function to find the nearest point
function findNearestPoint(newPoint, existingPoints) {
  let nearestPoint = null;
  let nearestDistance = Infinity;

  existingPoints.forEach(point => {
    const distance = calculateDistance(newPoint, L.latLng(point[0], point[1]));
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestPoint = L.latLng(point[0], point[1]);
    }
  });

  return nearestPoint;
}

// Function to calculate the distance between two points (using the Haversine formula)
function calculateDistance(point1, point2) {
  const R = 6371e3; // Earth radius in meters
  const lat1 = point1.lat * Math.PI / 180;
  const lat2 = point2.lat * Math.PI / 180;
  const deltaLat = (point2.lat - point1.lat) * Math.PI / 180;
  const deltaLon = (point2.lng - point1.lng) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

// Function to get the route from the OpenRouteService API
function getRoute(start, end) {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const routeCoords = data.features[0].geometry.coordinates.map(coord => coord.reverse()); // Reverse from [lng, lat] to [lat, lng]

      // Add the new route to the map
      const route = L.polyline(routeCoords, {
        color: 'red',
        weight: 5,
        opacity: 0.7,
        lineJoin: 'round'
      }).addTo(map);
      routes.push(route); // Store the route
    })
    .catch(err => console.error(err));
}

// Function to delete all markers
function deleteMarkers() {
  markers.forEach(marker => map.removeLayer(marker));
  markers = []; // Clear the markers array
  waypoints = []; // Clear the waypoints
}

// Function to delete all routes
function deleteRoutes() {
  routes.forEach(route => map.removeLayer(route));
  routes = []; // Clear the routes array
}

let markersEnabled = true;  // Controls whether markers can be added

// Function to add stops and calculate route
function addStop(latlng) {
  if (markersEnabled) { // Only add the marker if markers are enabled
    // Add marker to the map
    const marker = L.marker(latlng).addTo(map);
    markers.push(marker); // Store the marker

    waypoints.push([latlng.lat, latlng.lng]);

    // Calculate the route from the nearest point if there are at least 2 points
    if (waypoints.length >= 2) {
      const nearestPoint = findNearestPoint(latlng, waypoints.slice(0, -1));
      getRoute(nearestPoint, latlng);
    }
  }
}

// Listener to add point when clicking on the map
map.on('click', function(e) {
  addStop(e.latlng);
});

// Function to toggle marker enable/disable
function toggleMarkers() {
  markersEnabled = !markersEnabled; // Toggle between enabling and disabling markers

  if (!markersEnabled) {
    document.getElementById("toggleMarkersBtn").innerHTML = "Enable Markers";
  } else {
    document.getElementById("toggleMarkersBtn").innerHTML = "Disable Markers";
  }
}

// Function to delete all markers
function deleteMarkers() {
  markers.forEach(marker => map.removeLayer(marker));
  markers = []; // Clear the markers array
  waypoints = []; // Clear the waypoints
}

// Function to delete all routes
function deleteRoutes() {
  routes.forEach(route => map.removeLayer(route));
  routes = []; // Clear the routes array
}

// UI control functions to enable/disable
document.getElementById('toggleMarkersBtn').addEventListener('click', toggleMarkers);



// Listener to add point when clicking on the map
map.on('click', function (e) {
  addStop(e.latlng);
});