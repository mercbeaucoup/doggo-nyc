import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import DogRunMarker from "./DogRunMarker";
import YourLocationMarker from "./YourLocationMarker";
import DogRunPolygons from "./DogRunPolygon";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import ChangeView from "./ChangeView";

class Map extends Component {

  render() {
    const defaultLat = 40.742;
    const defaultLng = -73.9073;
    const defaultZoom = 11;
    const {
      dogRuns,
      lat,
      lng,
      handleClick,
      handleDelete,
      favorites,
      currentDogRun,
    } = this.props;

    return (
      <MapContainer
        center={[defaultLat, defaultLng]}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        touchZoom={true}
      >
        {lat && !this.props.currentDogRun.id && (
          <div>
            <ChangeView center={[lat, lng]} zoom={14} />
            <YourLocationMarker lat={lat} lng={lng} />
          </div>
        )}
        {this.props.currentDogRun.id && (
          <div>
            <ChangeView
              center={[
                currentDogRun.coords[0][0][0][1],
                currentDogRun.coords[0][0][0][0],
              ]}
              zoom={15}
            />
            <YourLocationMarker lat={lat} lng={lng} />
          </div>
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
    done: state.user.done,
    userZoom: state.user.zoom,
  };
};

export default connect(mapStateToProps, null)(Map);
