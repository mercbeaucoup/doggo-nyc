import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "./components/Map";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { fetchDogRuns } from "./store/allDogRuns";
import { Ripple } from "react-spinners-css";
import Header from "./Header";
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
        <Header />
        {this.props.dogRuns ? (
          <div className="map-div">
            <Map />
          </div>
        ) : (
          <div className="locating-div">
            <h5 className="locating-msg">Locating dog runs near you...</h5>
            <br />
            <Ripple />
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
    userZoom: state.user.zoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDogRuns: () => dispatch(fetchDogRuns()),
    getUserCoords: () => dispatch(fetchUserCoords()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
