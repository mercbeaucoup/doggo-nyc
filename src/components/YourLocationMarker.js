import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import L, { Icon } from "leaflet";
import youIconImg from "../static/icons/red_icon.png";

const youIcon = new L.Icon({
  iconUrl: youIconImg,
  iconSize: [20, 25],
});

const YourLocationMarker = (props) => {
  const { lat, lng } = props;

  return (
    <Marker position={[lat, lng]} icon={youIcon}>
      <Popup position={[lat, lng]}>
        <div>This is you!</div>
      </Popup>
    </Marker>
  );
};

export default YourLocationMarker;