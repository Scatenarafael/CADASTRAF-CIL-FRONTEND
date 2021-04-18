import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Sidebar from '../elementos/Sidebar';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import '../../styles/pages/client-register.css';
import Leaflet from 'leaflet';
import mapMarkerImg from '../../images/marker.svg';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [170, -20]
});

export default function ClientRegister() {
  const params = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState([-20.2759398, -50.2531764]);
  const [clientData, setClientData] = useState(
    {
      _id: "",
      name: "",
      cpfcnpj: "",
      address: "",
      businessline: "",
      about: "",
      contact: {
        name: "",
        cel: "",
        business_position: ""
      },
      images: [{
        path: "",
        url: ""
      }]
    }
  );

  useEffect(() => {
    getClientData();
  }, [])


  async function getClientData() {

    await api.get(`/show-client/${params.id}`)
      .then((response) => {
        console.log(parseInt(response.data[0].images[0].path.split('-')[0]));
        setClientData(response.data[0]);
        setCurrentPosition([response.data[0].latitude, response.data[0].longitude]);
      })
      .catch(
        (err) => {
          console.log(err);
        })
      ;
  }

  return (
    <div id="page-client-register">

      <Sidebar />
      <main>
        <div className="client-register-details">
          <img src={clientData.images[activeImageIndex].url} alt={clientData.name} />

          <div className="images">
            {
              clientData.images.map((image, index) => {
                return (
                  <button
                    key={image.path}
                    className={activeImageIndex === index ? 'active' : ''}
                    type="button"
                    onClick={
                      ()=>{
                        setActiveImageIndex(index);
                    }}
                  >
                    <img src={image.url} alt={clientData.name} />
                  </button>
                );
              })
            }
          </div>

          <div className="client-register-details-content">
            <h2>Razão Social: {clientData.name}</h2>
            <br />
            <h2>Endereço: {clientData.address}</h2>
            <br />
            <h2>Ramo: {clientData.address}</h2>
            <br />
            <h2>Detalhes: {clientData.about}</h2>
            <br />

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
              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${currentPosition[0]},${currentPosition[1]}`}>Clique aqui para obter a Rota</a>
              </footer>
            </div>
            <hr />
            <h1>Contato</h1>
            <br />
            <h2>Nome: {clientData.contact.name}</h2>
            <br />
            <h2>Telefone: {clientData.contact.cel}</h2>
            <br />
            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}