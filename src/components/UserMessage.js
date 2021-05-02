import React from "react";
import { connect } from "react-redux";
import { getDistance, convertDistance } from "geolib";

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
    console.log(closest);
  }

  return (
    <div>
      {!props.done ? (
        <p className="loading-msg">
          Currently locating you and the closest dog run...
        </p>
      ) : closest ? (
        <p className="loading-msg">
          The closest dog run is {closest.dogRun.name}. <br />
          It is {closest.distance * 0.000621371} miles away.
          <br />
          <br />
          <button>Take me there!</button>
        </p>
      ) : (
        <p className="loading-msg">
          If you allow your location, DogGo NYC will determine which dog run is
          closest.
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
