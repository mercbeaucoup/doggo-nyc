import "./App.css";
import React, { Component } from "react";
import Map from "./components/Map";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    dogRuns: [],
    lat: null,
    lng: null,
    zoom: 0,
    error: null,
    permission: false,
  };

  async componentDidMount() {
    const res = await axios.get(
      "https://data.cityofnewyork.us/resource/hxx3-bwgv.json"
    );
    const dogRuns = res.data.map((dogRun) => {
      let boroughName;
      if (dogRun.borough === "M") {
        boroughName = "Manhattan";
      }
      if (dogRun.borough === "X") {
        boroughName = "Bronx";
      }
      if (dogRun.borough === "Q") {
        boroughName = "Queens";
      }
      if (dogRun.borough === "B") {
        boroughName = "Brooklyn";
      }

      return {
        id: dogRun.objectid,
        coords: dogRun.the_geom.coordinates,
        zip: dogRun.zipcode,
        borough: boroughName,
        name: dogRun.name,
        seating: dogRun.seating,
      };
    });
    this.setState({ dogRuns });

    const successCallback = (position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 13,
        permission: true,
      });
    };

    const errorCallback = (error) => {
      if (error.code === 1) {
        alert(
          "DogGo NYC is more helpful when you allow your location! For now, we'll give you a map of the whole city."
        );
      }
      if (error.code === 2) {
        alert(
          "Oops! Something went wrong in finding your location. For now, we'll give you a map of the whole city."
        );
      }
      if (error.code === 3) {
        alert(
          "Oops! Finding your location took a little too long. For now, we'll give you a map of the whole city."
        );
      }
      console.error(error);
      this.setState({
        lat: 40.742,
        lng: -73.9073,
        zoom: 9,
        permission: false,
      });
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    });
  }
  render() {
    return (
      <div className="main-app-div">
        <div className="header">
          <h2>DogGo NYC</h2>
          <p>
            A mobile website that helps dog owners and walkers find the nearest
            dog run when out and about with a pup in the Big Apple.
          </p>
        </div>
        {this.state.dogRuns && this.state.lat ? (
          <div className="map-div">
            <Map
              dogRuns={this.state.dogRuns}
              lat={this.state.lat}
              lng={this.state.lng}
              zoom={this.state.zoom}
              permission={this.state.permission}
            />
          </div>
        ) : (
          <div className="locating-div">
            <h5 className="locating-msg">Locating dog runs near you...</h5>
          </div>
        )}
      </div>
    );
  }
}

export default App;
