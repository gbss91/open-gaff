"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DynamicMap = () => {
  return (
    <MapContainer
      center={[53.3498, -6.2603]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Marker position={[53.3498, -6.2603]}>
        <Popup>Dublin</Popup>
      </Marker>
    </MapContainer>
  );
};

export default DynamicMap;
