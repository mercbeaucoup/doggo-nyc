import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "./components/Map";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { fetchDogRuns } from "./store/allDogRuns";
import { fetchUserCoords } from "./store/user";

class App extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    this.props.getDogRuns();
    this.props.getUserCoords();
  }

  render() {
    return (
      <div className="main-app-div">
        <div className="header">
          <h2>DogGo NYC</h2>
          <p className="website-desc">
            A mobile website that helps dog owners and walkers find the nearest
            dog run when out and about with a pup in the Big Apple.
          </p>
        </div>
        {this.props.dogRuns && this.props.lat ? (
          <div className="map-div">
            <Map
              dogRuns={this.props.dogRuns}
              lat={this.props.lat}
              lng={this.props.lng}
              zoom={this.props.zoom}
              permission={this.props.permission}
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

const mapStateToProps = (state) => {
  return {
    dogRuns: state.allDogRuns,
    lat: state.user.lat,
    lng: state.user.lng,
    permission: state.user.permission,
    zoom: state.user.zoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDogRuns: () => dispatch(fetchDogRuns()),
    getUserCoords: () => dispatch(fetchUserCoords()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
