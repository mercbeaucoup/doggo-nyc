import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import dogIconImg from "../static/icons/dog-paw.png";
import faveIconImg from "../static/icons/star.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dogIcon = new L.Icon({
  iconUrl: dogIconImg,
  iconSize: [20, 20],
});

const starIcon = new L.Icon({
  iconUrl: faveIconImg,
  iconSize: [20, 20],
});

class DogRunMarker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dogRun, isFavorite, handleClick, handleDelete } = this.props;
    const lat = dogRun.coords[0][0][0][1];
    const lng = dogRun.coords[0][0][0][0];
    return (
      <Marker
        key={dogRun.id}
        position={[lat, lng]}
        icon={isFavorite ? starIcon : dogIcon}
      >
        <Popup position={[lat, lng]}>
          <div>
            <h3>{dogRun.name}</h3>
            <p>Borough: {dogRun.borough}</p>
            <p>Seating: {dogRun.seating ? "Yes" : "No"}</p>
            {!this.props.isFavorite ? (
              <button
                className="favorite-button"
                type="button"
                value={dogRun.id}
                onClick={handleClick}
              >
                Add To Favorites
              </button>
            ) : (
              <button
                className="favorite-button"
                type="button"
                value={dogRun.id}
                onClick={handleDelete}
              >
                Delete from Favorites
              </button>
            )}
            <br />
            <br />
            <a
              href={`https://www.google.com/maps/dir/${this.props.lat},${this.props.lng}/${lat},${lng}`}
            >
              Get directions!
            </a>
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default DogRunMarker;
