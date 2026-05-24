# Interactive Route Map with Leaflet

Interactive web mapping application developed with **Leaflet.js**, allowing route creation, shapefile import, geometric drawing, and real-time coordinate visualization directly in the browser.

The project provides a lightweight WebGIS environment for spatial visualization and route interaction.

---

# Features

The application includes:

- multiple basemaps;
- route generation;
- waypoint creation;
- geometric drawing tools;
- real-time coordinates;
- minimap support;
- marker management;
- route management.

---

# Main Functionalities

## Interactive Web Map

The map is initialized using Leaflet and centered on Santa Catarina, Brazil. :contentReference[oaicite:0]{index=0}

```javascript
var map = L.map('map', {
  center: [-27.2723, -50.2515],
  zoom: 7
});
```

---

## Multiple Basemaps

The project supports different basemap layers:

- OpenStreetMap;
- ArcGIS Street Map;
- Esri World Imagery. :contentReference[oaicite:1]{index=1}

```javascript
L.control.layers(baseMaps).addTo(map);
```

---

## Shapefile Import

The application allows importing zipped shapefiles (`.zip`) directly into the browser using:

- JSZip;
- shapefile.js;
- Leaflet GeoJSON layers. :contentReference[oaicite:2]{index=2}

```javascript
handleShapefileUpload(file);
```

---

## Route Generation

Routes are generated dynamically using the OpenRouteService API. :contentReference[oaicite:3]{index=3}

Features include:

- waypoint creation;
- nearest-point connection;
- automatic route drawing;
- route removal.

```javascript
getRoute(start, end);
```

---

## Drawing Tools

The application includes drawing tools powered by Leaflet Draw. :contentReference[oaicite:4]{index=4}

Supported geometries:

- polygons;
- polylines;
- rectangles;
- circles.

```javascript
var drawControl = new L.Control.Draw({...});
```

---

## Real-Time Coordinates

Mouse coordinates are displayed dynamically while moving across the map. :contentReference[oaicite:5]{index=5}

```javascript
map.on('mousemove', function (e) {...});
```

---

# Project Structure

```text
Route_Map/
│
├── index.html
├── style.css
│
├── javascript/
│   ├── importer.js
│   ├── route.js
│   ├── draw.js
│   └── coordinate.js
│
└── README.md
```

---

# Technologies Used

- HTML5
- CSS3
- JavaScript
- Leaflet.js
- Leaflet Draw
- OpenRouteService API
- JSZip
- shapefile.js

---

# External Libraries

The project uses the following external libraries via CDN:

```html
Leaflet.js
Leaflet Draw
JSZip
shapefile.js
```

:contentReference[oaicite:6]{index=6}

---

# How to Run

## Local Execution

Simply open:

```text
index.html
```

in a web browser.

---

## VS Code Live Server (Recommended)

1. Install the Live Server extension in VS Code;
2. Open the project folder;
3. Right-click `index.html`;
4. Select:

```text
Open with Live Server
```

---

# Interface Controls

The application interface includes:

- shapefile import button;
- delete markers button;
- delete routes button;
- marker enable/disable button. :contentReference[oaicite:7]{index=7}

---

# Route System

The routing system:

- stores waypoints;
- calculates nearest connections;
- generates routes through OpenRouteService;
- draws polylines dynamically on the map. :contentReference[oaicite:8]{index=8}

---

# Styling

The interface styling is implemented in:

```text
style.css
```

Features include:

- fullscreen map;
- floating controls;
- responsive buttons;
- coordinate display;
- hover effects. :contentReference[oaicite:9]{index=9}

---

# Applications

Possible applications include:

- route planning;
- spatial visualization;
- WebGIS systems;
- urban mobility studies;
- environmental analysis;
- geospatial education;
- GIS dashboards.

---

# Author

Developed by Bruna Rocha.
