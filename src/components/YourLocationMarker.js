import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import youIconImg from "../static/icons/red_icon.png";

const youIcon = new L.Icon({
  iconUrl: youIconImg,
  iconSize: [30, 35],
  iconAnchor: [15,35]
});

const YourLocationMarker = (props) => {
  const { lat, lng } = props;

  return (
    <Marker position={[lat, lng]} icon={youIcon}>
      <Popup position={[lat, lng]}>
        <div>You are here!</div>
      </Popup>
    </Marker>
  );
};

export default YourLocationMarker;
