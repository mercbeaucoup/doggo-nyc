import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import DogRunMarker from "./DogRunMarker";
import YourLocationMarker from "./YourLocationMarker";
import DogRunPolygons from "./DogRunPolygon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default class Map extends Component {
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
      toast("You've deleted this dog run from your favorites!");
    };
    const favorites = this.state.favorites.filter(
      (id) => id !== evt.target.value
    );
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
    this.setState({ favorites });
    notify();
  }

  handleClick(evt) {
    const favorites = [...this.state.favorites, evt.target.value];
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
    this.setState({ favorites });
  }

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
          this.props.dogRuns.map((dogRun) => {
            const isFavorite = this.state.favorites.includes(dogRun.id);
            return (
              <DogRunMarker
                dogRun={dogRun}
                key={dogRun.id}
                lat={this.props.lat}
                lng={this.props.lng}
                isFavorite={isFavorite}
                handleClick={this.handleClick}
                handleDelete={this.handleDelete}
              />
            );
          })}
        {this.props.permission && (
          <YourLocationMarker lat={this.props.lat} lng={this.props.lng} />
        )}
        <DogRunPolygons />
      </MapContainer>
    );
  }
}
