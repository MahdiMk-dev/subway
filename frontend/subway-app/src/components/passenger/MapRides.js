import React, { useEffect, useState, useRef } from "react";
import {
  TileLayer,
  Marker,
  Popup,
  MapContainer,
  LayersControl
} from "react-leaflet";
import markerIcon from 'leaflet/dist/images/marker-icon.png';

import L, { divIcon } from 'leaflet';
import "leaflet/dist/leaflet.css";

import RoutingControl from './RoutingControl'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const MapRides = () => {
    const [stations, setstations] = useState([]);
  const [rides, setrides] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get_map', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log(data)
                if (data.status === 'success') {
                    console.log(data.stations)
                    if (data.stations.length>0) {
                        const s=data.stations.map(station => {
                       return{ id: station.id,
                        name: station.name,
                        location:[station.lng,station.lat]}
                        });
                        const r=data.rides.map(ride => {
                          return{
                          id: ride.id,
                        start: ride.origin_station_id,
                        end:ride.destination_station_id
                      }
                        });
                        setstations(s);
                        setrides(r);
                    }
                }
                 else {
                    alert("no data found");
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);
    const colors = ['blue', 'red', 'green', 'orange'];
  const [map, setMap] = useState(null);
  const [start, setStart] = useState([38.9072, -77.0369])
  const [end, setEnd] = useState([37.7749, -122.4194])
    console.log(stations)
  const newStations = stations.map(station => {
  // Find start and end stations based on ride IDs

  // Return new object with additional information
  return {
    id: station.id,
    name: station.name,
    lat:station.location[1],
    long:station.location[0]
  };
});
  console.log('hi')
console.log(newStations)
  const markerIconConst = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  });
    // Create a new array to store transformed data
const newRides = rides.map(ride => {
  // Find start and end stations based on ride IDs
  const startStation = stations.find(station => station.id === ride.start);
  const endStation = stations.find(station => station.id === ride.end);

  // Calculate distance between start and end stations (assuming the location is in [longitude, latitude] format)

  // Return new object with additional information
  return {
    id: ride.id,
    start: startStation,
    start_lat:startStation.location[1],
    start_long:startStation.location[0],
    end_lat:endStation.location[1],
    end_long:endStation.location[0],
    end: endStation,
  };
});

    // Function to generate a random color
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
  return (
    <>
      <MapContainer
        center={[52.370216,4.895168]}
        zoom={6}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={map => setMap(map)}
      >
        {/* *************** */}
        {/* Pass in our custom control layer here, inside of the map container */}
        {/* *************** */}

        {newRides.map(ride => (
          <RoutingControl 
          position={'topleft'} 
          start={[ride.start_lat, ride.start_long]} 
          end={[ride.end_lat, ride.end_long]} 
          color={getRandomColor()}

        />
            ))}
        

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
            {stations.map(station => (
                <Marker
                    key={station.id}
                    position={[station.location[1], station.location[0]]}
                     icon={markerIconConst} 
                >
                    <Popup>{station.name}</Popup>
                </Marker>
            ))}

          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default MapRides;
