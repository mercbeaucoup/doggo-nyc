import React from "react";

const SingleFavorite = (props) => {
  const { name, zip, borough, id } = props.favorite;
  const { handleDelete } = props;
  return (
    <div className="single-favorite">
      <p>
        {name}
        <br />
        {borough}, New York {zip} <br />
        <button type="button" value={id} onClick={props.handleRecenter}>
          Take me there!
        </button>
        {"  "}
        <button type="button" value={id} onClick={handleDelete}>
          x
        </button>
      </p>
    </div>
  );
};

export default SingleFavorite;
