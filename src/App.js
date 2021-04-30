import "./App.css";
import React, { Component } from "react";
import Map from "./components/Map";
import axios from "axios";

class App extends Component {
  state = {
    dogRuns: [],
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
        <Map dogRuns={this.state.dogRuns} />
      </div>
    );
  }
}

export default App;
