import axios from "axios";

const initialState = [];

//action types
const SET_DOGRUNS = "SET_DOGRUNS";

//action creators
export const setDogRuns = (dogRuns) => {
  return {
    type: SET_DOGRUNS,
    dogRuns,
  };
};

//thunk creators
export const fetchDogRuns = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://data.cityofnewyork.us/resource/hxx3-bwgv.json"
      );
      const dogRuns = res.data.map((dogRun) => {
        let boroughName;
        if (dogRun.borough === "M") {
          boroughName = "Manhattan";
        }
        if (dogRun.borough === "X") {
          boroughName = "Bronx";
        }
        if (dogRun.borough === "Q") {
          boroughName = "Queens";
        }
        if (dogRun.borough === "B") {
          boroughName = "Brooklyn";
        }

        return {
          id: dogRun.objectid,
          coords: dogRun.the_geom.coordinates,
          zip: dogRun.zipcode,
          borough: boroughName,
          name: dogRun.name,
          seating: dogRun.seating,
        };
      });
      dispatch(setDogRuns(dogRuns));
    } catch (err) {
      console.error(err);
    }
  };
};

//subreducer
export default function allDogRunsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DOGRUNS:
      return action.dogRuns;
    default:
      return state;
  }
}
