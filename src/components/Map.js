import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default class Map extends Component {
  render() {
    console.log("this is props:", this.props);
    return this.props.dogRuns ? (
      <MapContainer
        center={[this.props.lat, this.props.lng]}
        zoom={this.props.zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.props.dogRuns.map((dogRun) => {
          //const point = [dogRun.coords[0][0][0]];
          const point = [51.505, -0.09];
          return (
            <Marker key={dogRun.id} position={point}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    ) : (
      "Data is loading..."
    );
  }
}
