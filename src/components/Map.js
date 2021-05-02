import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import DogRunMarker from "./DogRunMarker";
import YourLocationMarker from "./YourLocationMarker";
import DogRunPolygons from "./DogRunPolygon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { map } from "leaflet";
import ChangeView from "./ChangeView";

toast.configure();

class Map extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const favorites =
      JSON.parse(window.localStorage.getItem("favorites")) || [];
    this.setState({ favorites });
  }

  handleDelete(evt) {
    const notify = () => {
      toast.warning(`You've deleted this dog run from your favorites!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
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
        autoClose: 4000,
      });
    };
    const favorites = [...this.state.favorites, evt.target.value];
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
    this.setState({ favorites });
    notify();
  }

  render() {
    const defaultLat = 40.742;
    const defaultLng = -73.9073;
    const defaultZoom = 11;
    const { dogRuns, lat, lng, permission, userZoom } = this.props;

    return (
      <MapContainer
        center={[defaultLat, defaultLng]}
        zoom={defaultZoom}
        scrollWheelZoom={true}
      >
        {lat && <ChangeView center={[lat, lng]} zoom={userZoom} />}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {dogRuns.length &&
          dogRuns.map((dogRun) => {
            const isFavorite = this.state.favorites.includes(dogRun.id);
            return (
              <DogRunMarker
                dogRun={dogRun}
                key={dogRun.id}
                lat={lat}
                lng={lng}
                isFavorite={isFavorite}
                handleClick={this.handleClick}
                handleDelete={this.handleDelete}
              />
            );
          })}
        {!lat ? (
          <div className="loading">Loading your location...</div>
        ) : (
          permission && <YourLocationMarker lat={lat} lng={lng} />
        )}
        <DogRunPolygons />
      </MapContainer>
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

export default connect(mapStateToProps, null)(Map);
