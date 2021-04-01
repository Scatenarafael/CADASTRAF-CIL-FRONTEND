import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import Leaflet from 'leaflet';
import mapMarkerImg from '../../images/marker.svg';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';


const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [170, -20]
})

function MapView(props) {
  const chData = useSelector((state) => { return state });

  let center = [chData.position[0], chData.position[1]];

  return (
    <MapContainer
     center={center} zoom={15} className={props.classname}>
      <TileLayer
        //https://docs.mapbox.com/mapbox-gl-js/api/map/
        url={`https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />

      <Marker
        icon={mapIcon}
        position={center}
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

    </MapContainer>
  );
}

export default MapView;