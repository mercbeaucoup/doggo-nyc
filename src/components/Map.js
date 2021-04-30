import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.70341248101454,
      lng: -73.92393539467943,
      zoom: 13,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log(newCoords);
      },
      (error) => {
        console.log(error);
      },
      { timeout: 10000, maximumAge: 60000 }
    );
    if ("geolocation" in navigator) {
      console.log("geolocation is available");
    } else {
      console.log("geolocation is not available");
    }

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log("permission is granted");
          } else if (result.state === "prompt") {
            console.log(result.state);
          } else if (result.state === "denied") {
            console.log("you need to enable your location!");
          }
        });
    } else {
      alert("sorry not available");
    }
  }

  //   success(position) {
  //     console.log(position);
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     console.log("this is latitude", latitude);
  //     this.setState({ lat: latitude, lng: longitude });
  //   }

  //   noLocation() {
  //     console.log("NO LOCATION");
  //   }

  render() {
    return this.props.dogRuns ? (
      <MapContainer
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}
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
