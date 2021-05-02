import React from "react";
import { connect } from "react-redux";
import { getDistance } from "geolib";

const UserMessage = (props) => {
  let closest;
  if (props.lat) {
    const dogRunsWithDist = props.dogRuns.map((dogRun) => {
      const dogLat = dogRun.coords[0][0][0][1];
      const dogLng = dogRun.coords[0][0][0][0];
      const distance = getDistance(
        { latitude: Number(props.lat), longitude: Number(props.lng) },
        { latitude: Number(dogLat), longitude: Number(dogLng) }
      );
      return { dogRun, distance: distance };
    });
    dogRunsWithDist.sort(function (a, b) {
      return a.distance - b.distance;
    });
    closest = dogRunsWithDist[0];
  }

  return (
    <div>
      {!props.done ? (
        <p className="loading-msg">
          Currently locating you and the closest dog run...
        </p>
      ) : closest ? (
        <p className="loading-msg">
          {closest.dogRun.name} is{" "}
          {Math.round(closest.distance * 0.000621371 * 100) / 100} miles away.
          <br />
        </p>
      ) : (
        <p className="loading-msg">
          If you allow your location, DogGo NYC will determine which dog run is
          closest to you.
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dogRuns: state.allDogRuns,
    done: state.user.done,
    lat: state.user.lat,
    lng: state.user.lng,
  };
};

export default connect(mapStateToProps, null)(UserMessage);
