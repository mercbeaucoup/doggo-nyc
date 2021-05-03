const initialState = {
  lat: null,
  lng: null,
  zoom: 12,
  done: false,
  favorites: [],
};

//action types
const SET_USER_COORDS = "SET_USER_LAT";
const SET_USER_ZOOM = "SET_USER_ZOOM";
const SET_USER_DONE = "SET_USER_DONE";

//action creators
export const setUserCoords = (coords) => {
  return {
    type: SET_USER_COORDS,
    coords,
  };
};

export const setUserZoom = (zoom) => {
  return {
    type: SET_USER_ZOOM,
    zoom,
  };
};

export const setUserDone = (isDone) => {
  return {
    type: SET_USER_DONE,
    isDone,
  };
};

//thunk creator
export const fetchUserCoords = () => {
  return async (dispatch) => {
    try {
      const successCallback = (position) => {
        dispatch(setUserZoom(13));
        dispatch(setUserCoords(position.coords));
        dispatch(setUserDone(true));
      };
      const errorCallback = (error) => {
        if (error.code === 1) {
          alert(
            "DogGo NYC is more helpful when you allow your location. For now, we'll give you a map of the whole city."
          );
        }
        if (error.code === 2) {
          alert(
            "Oops! Something went wrong in finding your location. For now, we'll give you a map of the whole city."
          );
        }
        if (error.code === 3) {
          alert(
            "Oops! Finding your location took a little too long. For now, we'll give you a map of the whole city."
          );
        }
        dispatch(setUserDone(true));
      };
      await navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
};

//subreducer
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_COORDS:
      return {
        ...state,
        lat: action.coords.latitude,
        lng: action.coords.longitude,
      };
    case SET_USER_DONE:
      return {
        ...state,
        done: action.isDone,
      };
    case SET_USER_ZOOM:
      return {
        ...state,
        zoom: action.zoom,
      };
    default:
      return state;
  }
}
