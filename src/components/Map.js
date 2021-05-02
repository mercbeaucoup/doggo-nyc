import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import DogRunMarker from "./DogRunMarker";
import YourLocationMarker from "./YourLocationMarker";
import DogRunPolygons from "./DogRunPolygon";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import ChangeView from "./ChangeView";

class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const defaultLat = 40.742;
    const defaultLng = -73.9073;
    const defaultZoom = 11;
    const {
      dogRuns,
      lat,
      lng,
      userZoom,
      handleClick,
      handleDelete,
      favorites,
    } = this.props;

    return (
      <MapContainer
        center={[defaultLat, defaultLng]}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        touchZoom={true}
      >
        {lat ? (
          <div>
            <ChangeView center={[lat, lng]} zoom={userZoom} />
            <YourLocationMarker lat={lat} lng={lng} />
          </div>
        ) : (
          <div>Loading your location...</div>
        )}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {dogRuns.length &&
          dogRuns.map((dogRun) => {
            const isFavorite = favorites.includes(dogRun.id);
            return (
              <DogRunMarker
                dogRun={dogRun}
                key={dogRun.id}
                lat={lat}
                lng={lng}
                isFavorite={isFavorite}
                handleClick={handleClick}
                handleDelete={handleDelete}
              />
            );
          })}
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
