import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "./components/Map";
import "react-toastify/dist/ReactToastify.css";
import { fetchDogRuns } from "./store/allDogRuns";
import Header from "./Header";
import { fetchUserCoords } from "./store/user";
import Favorites from "./components/Favorites";
import { toast } from "react-toastify";
import UserMessage from "./components/UserMessage";

toast.configure();

class App extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    this.props.getDogRuns();
    this.props.getUserCoords();
    const favorites =
      (await JSON.parse(window.localStorage.getItem("favorites"))) || [];
    this.setState({ favorites });
  }

  handleDelete(evt) {
    const notify = () => {
      toast.warning(`You've deleted this dog run from your favorites!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    };
    const favorites = this.state.favorites.filter(
      (id) => id !== evt.target.value
    );
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
    this.setState({ favorites });
    notify();
  }

  handleClick(evt) {
    const notify = () => {
      toast.success("You've added this dog run to your favorites!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    };
    const favorites = [...this.state.favorites, evt.target.value];
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
    this.setState({ favorites });
    notify();
  }

  render() {
    return (
      <div className="main-app-div">
        <Header />
        <UserMessage />
        <div className="map-div">
          <Map
            favorites={this.state.favorites}
            handleDelete={this.handleDelete}
            handleClick={this.handleClick}
          />
        </div>
        <Favorites
          favorites={this.state.favorites}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dogRuns: state.allDogRuns,
    lat: state.user.lat,
    lng: state.user.lng,
    done: state.user.done,
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
