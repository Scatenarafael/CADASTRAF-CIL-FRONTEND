import React, { useEffect, useState } from 'react';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import { FiPlus } from "react-icons/fi";
import Sidebar from '../elementos/Sidebar'
import { FaWhatsapp } from "react-icons/fa";

import '../../styles/pages/create-client.css';

// import { createStore, applyMiddleware } from 'redux';
// import chDataReducer from '../reducers/mapReducer';
// import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
// import { getPosition } from '../actions/mapActions'
import Inputlist from '../elementos/Inputlist';
import Leaflet from 'leaflet';
import mapMarkerImg from '../../images/marker.svg';


const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [170, -20]
})

function CreateClient(props) {
  // const store = createStore(chDataReducer, applyMiddleware(thunk));
  const [currentPosition, setCurrentPosition] = useState([-20.2759398, -50.2531764]);

  useEffect(() => {
    if (localStorage.getItem('currentPosition') != null) {
      try {
        if (JSON.parse(localStorage.getItem('currentPosition')).address) {
          let address = JSON.parse(localStorage.getItem('currentPosition')).address;
          let respPos = JSON.parse(localStorage.getItem('currentPosition')).respectivePosition;
          setCurrentPosition(respPos);
          document.querySelector('#address-input').value = address;
          console.log(address, respPos);
        } else {
          let respPos = JSON.parse(localStorage.getItem('currentPosition')).respectivePosition;
          setCurrentPosition(respPos);
          console.log("Este if  aqui", respPos);
        }
      } catch (e) {
        console.log(e)
      };
    }
  }, [])

  function cnpjMask(e) {

    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
  }
  function telMask(e) {

    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + '-' + x[3];
  }


  return (
    // <Provider store={store}>
    <div>
      <div id="page-create-client">

        <Sidebar />

        <main>
          <form className="create-client-form">
            <fieldset>
              <legend>Dados</legend>
              <div className="mapview-container-cc">
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
                  </Marker>
                </MapContainer>

              </div>
              <div className="input-block">
                <form action="">
                  <label htmlFor="name-input">Razão Social</label>
                  <input id="name-input" />
                </form>
              </div>
              <div className="input-block">
                <form action="">
                  <label htmlFor="cnpj-input">CNPJ</label>
                  <input id="cnpj-input" onInput={(event) => { cnpjMask(event) }} />
                </form>
              </div>

              <div className="input-block">
                <form action="">
                  <label htmlFor="address-input">Endereço</label>
                  <input id="address-input" />
                </form>
              </div>

              <div className="input-block">
                <form action="">
                  <label htmlFor="branch-input">Ramo do Negócio</label>
                  <Inputlist id="branch-input" />
                </form>
              </div>

              <div className="input-block">
                <form action="">
                  <label htmlFor="about-input">Sobre <span>Máximo de 300 caracteres</span></label>
                  <textarea id="about-input" maxLength={300} />
                </form>
              </div>

              <div className="input-block">
                <form action="">
                  <label htmlFor="images">Fotos</label>
                </form>
                <div className="uploaded-image">

                </div>

                <button className="new-image">
                  <FiPlus size={24} color="#72e175" />
                </button>
              </div>
            </fieldset>

            <fieldset>
              <legend>Contato</legend>

              <div className="input-block">
                <form action="">
                  <label htmlFor="contact-name">Nome</label>
                  <input id="contact-name" />
                </form>
              </div>
              <div className="input-block">
                <form action="">
                  <label htmlFor="contact-cel">
                    <FaWhatsapp size={40} color="#39CC83" />
                    Telefone
                  </label>
                  <input id="contact-cel" onInput={(e) => { telMask(e) }} />
                </form>
              </div>

              <div className="input-block">
                <form action="">
                  <label htmlFor="business-position">Cargo</label>
                  <input id="business-position" />
                </form>
              </div>
              {/* 
                <div className="input-block">
                  <label htmlFor="open_on_weekends">Atende fim de semana</label>

                  <div className="button-select">
                    <button type="button" className="active">Sim</button>
                    <button type="button">Não</button>
                  </div>
                </div> */}
            </fieldset>

            <button className="confirm-button" type="submit">
              Confirmar
          </button>
          </form>
        </main>
      </div>
    </div>
    // </Provider>
  );
}

export default CreateClient;