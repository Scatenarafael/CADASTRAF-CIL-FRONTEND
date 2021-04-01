import React, {useEffect} from "react";
import { FaWhatsapp } from "react-icons/fa";
import MapView from '../elementos/Mapview';
import { createStore, applyMiddleware } from 'redux';
import chDataReducer from '../reducers/mapReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Sidebar from '../elementos/Sidebar'
import { getPosition } from '../actions/mapActions'


import '../../styles/pages/client-register.css';


export default function ClientRegister() {
  const store = createStore(chDataReducer, applyMiddleware(thunk))

  useEffect(()=>{
    store.dispatch(getPosition());
  },[store])

  return (
    <Provider store={store}>
      <div id="page-client-register">

        <Sidebar />
        <main>
          <div className="client-register-details">
            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />

            <div className="images">
              <button className="active" type="button">
                <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
              </button>
              <button type="button">
                <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
              </button>
              <button type="button">
                <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
              </button>
              <button type="button">
                <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
              </button>
              <button type="button">
                <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
              </button>
              <button type="button">
                <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
              </button>
            </div>

            <div className="client-register-details-content">
              <h2>Razão Social:</h2>
              <br/>
              <h2>Endereço:</h2>
              <br/>
              <h2>Ramo:</h2>
              <br/>
              <h2>Detalhes:</h2>
              <br/>


              {/* <div className="map-container"> */}

                <MapView classname="mapview-container-cc" />

                {/* <footer> */}
                  {/* <a href="">Ver rotas no Google Maps</a> */}
                {/* </footer>
              </div> */}

              <hr />


              <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
            </div>
          </div>
        </main>
      </div>
    </Provider>
  );
}