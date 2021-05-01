import React from "react";
import { GeoJSON } from "react-leaflet";
import parksData from "../data/NYC-dog-runs.json";

const DogRunPolygons = (props) => {
  const runStyle = {
    fillColor: "green",
    fillOpacity: 0.5,
    color: "green",
  };
  return <GeoJSON style={runStyle} data={parksData} />;
};

export default DogRunPolygons;
