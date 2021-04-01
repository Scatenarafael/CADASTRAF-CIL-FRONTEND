import axios from 'axios';
import api from '../../services/api';

export function locDone() {
  return { type: "LOC_DONE" };
}

export function endDone() {
  return { type: "END_DONE" };
}

export function getPosition() {

  return function (dispatch) {
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch({ type: "GET_POSITION", payload: [position.coords.latitude, position.coords.longitude] });
    }, (err) => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }, { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 });
  }
}

export function getGeocodePosition(event) {

  return function (dispatch) {
    if (event.key === "Enter") {
      event.preventDefault();
      let location = event.target.value;
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          key: process.env.REACT_APP_API_KEY_GOOGLE
        }
      })
        .then(function (response) {
          dispatch({ type: "GET_GEOCODE_POSITION", payload: [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng] });
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log(event.target.value);
      event.target.value = "";
    }
  }
}

export function getAllClientData() {

  return function (dispatch) {
    api.get('show-all-clients')
      .then(
        (response) => {
          dispatch({ type: "GET_ALL_CLIENT_DATA", clientData: [response.data] });
        })
      .catch(function (error) {
        console.log(error);
      });

  }
}


