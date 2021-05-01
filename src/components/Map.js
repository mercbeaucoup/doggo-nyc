import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import DogRunMarker from "./DogRunMarker";
import YourLocationMarker from "./YourLocationMarker";
import DogRunPolygons from "./DogRunPolygon";

export default class Map extends Component {
  render() {
    return (
      <MapContainer
        center={[this.props.lat, this.props.lng]}
        zoom={this.props.zoom + 2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.props.dogRuns.length &&
          this.props.dogRuns.map((dogRun) => (
            <DogRunMarker
              dogRun={dogRun}
              key={dogRun.id}
              lat={this.props.lat}
              lng={this.props.lng}
            />
          ))}
        {this.props.permission && (
          <YourLocationMarker lat={this.props.lat} lng={this.props.lng} />
        )}
        <DogRunPolygons />
      </MapContainer>
    );
  }
}
