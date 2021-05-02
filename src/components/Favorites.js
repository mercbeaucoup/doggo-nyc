import React from "react";
import SingleFavorite from "./SingleFavorite";
import { connect } from "react-redux";
import starIcon from "../static/icons/star.png";

const Favorites = (props) => {
  const favoriteDogRuns = props.dogRuns.filter((dogRun) =>
    props.favorites.includes(dogRun.id)
  );
  const starStyle = {
    height: "20px",
  };
  return (
    <div className="favorites-div">
      <div className="favorites-header-div">
        <img
          src={starIcon}
          className="favorite-div-star"
          style={starStyle}
          alt={""}
        />
        <h4>My Favorites</h4>
        <img
          src={starIcon}
          className="favorite-div-star"
          style={starStyle}
          alt={""}
        />
      </div>
      {favoriteDogRuns.length ? (
        favoriteDogRuns.map((favorite) => {
          return (
            <SingleFavorite
              key={favorite}
              favorite={favorite}
              handleDelete={props.handleDelete}
            />
          );
        })
      ) : (
        <p className="website-desc">
          You don't yet have any favorites! To add a favorite, click on your
          favorite dog park and click the "Add to Favorites" button.
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dogRuns: state.allDogRuns,
  };
};

export default connect(mapStateToProps, null)(Favorites);
