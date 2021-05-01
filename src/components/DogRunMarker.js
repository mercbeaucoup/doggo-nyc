import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import dogIconImg from "../static/icons/dog-paw.png";

const dogIcon = new L.Icon({
  iconUrl: dogIconImg,
  iconSize: [20, 20],
});

const DogRunMarker = (props) => {
  const { dogRun } = props;
  const lat = dogRun.coords[0][0][0][1];
  const lng = dogRun.coords[0][0][0][0];
  return (
    <Marker key={dogRun.id} position={[lat, lng]} icon={dogIcon}>
      <Popup position={[lat, lng]}>
        <div>
          <h3>{dogRun.name}</h3>
          <p>Borough: {dogRun.borough}</p>
          <p>Seating: {dogRun.seating ? "Yes" : "No"}</p>
          <a
            href={`https://www.google.com/maps/dir/${props.lat},${props.lng}/${lat},${lng}`}
          >
            Get directions!
          </a>
        </div>
      </Popup>
    </Marker>
  );
};

export default DogRunMarker;
