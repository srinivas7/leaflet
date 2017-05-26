var map = L.map('image-map', {
  
  minZoom: 0,
  maxZoom: 4,
  
  attributionControl: false
}).setView([0,0], 1 );

$.getJSON("testData.geojson",function(data){
    var ratIcon = L.icon({
      iconUrl: 'pin.png',
      iconSize: [75,50]
    });
    var rodents = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: ratIcon});
        marker.bindPopup(feature.properties.Location);
        return marker;
      }
    }).addTo(map);
    var clusters = L.markerClusterGroup();
    
    map.addLayer(clusters);
  });

L.control.attribution({
  prefix: false

}).addAttribution('Floor Plan @ Demo').addTo(map);

// dimensions of the image
var w = 1280 * 2,
    h = 806 * 2,
    url = '2550.svg';

// calculate the edges of the image, in coordinate space
var southWest = map.unproject([0, h], map.getMaxZoom()-1);
var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
var bounds = new L.LatLngBounds(southWest, northEast);

// add the image overlay, 
// so that it covers the entire map
L.imageOverlay(url, bounds).addTo(map);

// tell leaflet that the map is exactly as big as the image

map.setMaxBounds(bounds);









                    

