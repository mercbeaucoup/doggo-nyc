import "./App.css";
import React, { Component } from "react";
import Map from "./components/Map";
import axios from "axios";

class App extends Component {
  state = {
    dogRuns: [],
    lat: 40.70389939250883,
    lng: -73.9236647531099,
    zoom: 13,
  };

  async componentDidMount() {
    const res = await axios.get(
      "https://data.cityofnewyork.us/resource/hxx3-bwgv.json"
    );
    const dogRuns = res.data.map((dogRun) => {
      return {
        id: dogRun.objectid,
        coords: dogRun.the_geom.coordinates,
        zip: dogRun.zipcode,
        borough: dogRun.borough,
        name: dogRun.name,
        seating: dogRun.seating,
      };
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 14,
        });
      },
      (error) => {
        alert(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
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
    this.setState({ dogRuns });
  }
  render() {
    return (
      <div>
        <h2>Running with Reggie in NYC</h2>
        <p>
          A web app that helps dog owners find the nearest dog run when out and
          about with their pup.
        </p>
        <div className="map-div">
          <Map
            dogRuns={this.state.dogRuns}
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.zoom + 2}
          />
        </div>
      </div>
    );
  }
}

export default App;
