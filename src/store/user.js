const initialState = {
  lat: null,
  lng: null,
  zoom: 9,
  permission: false,
};

//action types
const SET_USER_COORDS = "SET_USER_LAT";
const SET_USER_ZOOM = "SET_USER_ZOOM";
const SET_USER_PERMISSION = "SET_USER_PERMISSION";

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

export const setUserPermission = (permission) => {
  return {
    type: SET_USER_PERMISSION,
    permission,
  };
};

//thunk creator
export const fetchUserCoords = () => {
  return async (dispatch) => {
    try {
      const successCallback = (position) => {
        dispatch(setUserCoords(position.coords));
        dispatch(setUserPermission(true));
        dispatch(setUserZoom(13));
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
        this.setState({
          lat: 40.742,
          lng: -73.9073,
          zoom: 9,
          permission: false,
        });
        dispatch(setUserCoords({ latitude: 40.742, longitude: -73.9073 }));
        dispatch(setUserZoom(9));
        dispatch(setUserPermission(false));
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
    case SET_USER_PERMISSION:
      return {
        ...state,
        permission: action.permission,
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
