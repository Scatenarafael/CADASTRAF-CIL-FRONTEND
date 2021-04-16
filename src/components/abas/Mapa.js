// import Form from '../elementos/Form'
// import LocalizaBTN from '../elementos/LocalizaBTN';
// import RadioLocEnd from '../elementos/RadioLocEnd';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import chDataReducer from '../reducers/mapReducer';
// import thunk from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../../App.css';
import logoImg from '../../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Leaflet from 'leaflet';
import mapMarkerImg from '../../images/marker.svg';
import api from '../../services/api';
import axios from 'axios';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [170, -20]
})


function Mapa(props) {
  const history = useHistory();
  // const store = createStore(chDataReducer, applyMiddleware(thunk))
  // const chData = store.getState();

  const [clients, setClients] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([-20.2759398, -50.2531764]);
  const [chData, setchData] = useState({
    locCheck: true,
    endCheck: false,
    disabledEndInput: true
  });


  function locDone() {
    setchData({
      locCheck: true,
      endCheck: false,
      disabledEndInput: true
    });
  }

  function endDone() {
    setchData({
      locCheck: false,
      endCheck: true,
      disabledEndInput: false
    });
  }

  function getAllClientData() {
    api.get('show-all-clients')
      .then(
        (response) => {
          setClients(response.data);
        })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentPosition([position.coords.latitude, position.coords.longitude]);
      localStorage.setItem('currentPosition', JSON.stringify({ respectivePosition: [position.coords.latitude, position.coords.longitude] }));
    }, (err) => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }, { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 });
  }

  function getGeocodePosition(event) {
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
          setCurrentPosition([response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]);
          localStorage.setItem('currentPosition', JSON.stringify({ address: event.target.value, respectivePosition: [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng] }));
          history.push('/clientes/create-client');
          console.log(event.target.value);
          event.target.value = "";
        })
        .catch(function (error) {
          console.log(error);
        });


    }
  }

  useEffect(() => {
    getAllClientData();

  }, [])

  return (
    // <Provider store={store}>
    <div className="map-container">
      <div className="left-side">
        <div className="img-container">
          <img src={logoImg} alt="Cadastra Fácil" id="img-logo" />
        </div>
        <div className="input-container">
          <div>
            <form action="" className="form">
              <label className="form-label">Endereço :</label>
              <input type="text" placeholder="Endereço" name="Endereço" id="client-input-endereco" className="form-input" disabled={chData.disabledEndInput} onKeyPress={(event) => { getGeocodePosition(event) }} />
            </form>
          </div>
          <div className="container-ch-locend">
            <button className={`btn-locend-${chData.locCheck}`} onClick={() => { locDone() }}>Localização</button>
            <button className={`btn-locend-${chData.endCheck}`} onClick={() => { endDone() }}>Endereço</button>
          </div>
          <div className="container-main">
            <button className="btn-loc" onClick={() => { getPosition() }} disabled={!chData.disabledEndInput}>Localizar!</button>
          </div>
        </div>
        <div className="home-arrow-container">
          <div className="home-text-right">
            Cadastrar cliente!
              </div>
          <Link to="/clientes/create-client">
            <FiArrowRight size={20} id="home-arrow-right" />
          </Link>
        </div>
      </div>
      <div className="mapview-container">
        <MapContainer
          center={currentPosition}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            //https://docs.mapbox.com/mapbox-gl-js/api/map/
            url={`https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />

          <Marker
            icon={mapIcon}
            position={currentPosition}
          >
            <Popup closeButton={false} minWidth={250} maxWidth={250} className="map-popup">

              Localização atual

                <div>
                <Link to="/clientes/create-client">
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </div>
            </Popup>
          </Marker>

          {
            clients.map((client) => {
              return (
                <Marker
                  key={client._id}
                  icon={mapIcon}
                  position={[client.latitude, client.longitude]}

                >
                  <Popup closeButton={false} minWidth={250} maxWidth={250} className="map-popup">

                    {client.name}

                    <div>
                      <Link to={`/clientes/${client.id}`}>
                        <FiArrowRight size={20} color="#FFF" />
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              )
            })

          }

        </MapContainer>
      </div>
    </div>
    // </Provider>
  );
}

export default Mapa;