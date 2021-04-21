import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import Sidebar from '../elementos/Sidebar'
import { FaWhatsapp } from "react-icons/fa";
import api from '../../services/api';
import '../../styles/pages/create-client.css';
import Leaflet from 'leaflet';
import mapMarkerImg from '../../images/marker.svg';


const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [170, -20]
})

function CreateClient(props) {
  const history = useHistory();
  const [currentPosition, setCurrentPosition] = useState([-20.2759398, -50.2531764]);
  const [name, setName] = useState();
  const [cpfcnpj, setCpfCnpj] = useState();
  const [address, setAddress] = useState();
  const [businessLine, setbusinessLine] = useState();
  const [about, setAbout] = useState();
  const [contactName, setContactName] = useState();
  const [contactCel, setContactCel] = useState();
  const [contactBusiness_position, setContactBusiness_Position] = useState();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('currentPosition') != null) {
      try {
        if (JSON.parse(localStorage.getItem('currentPosition')).address) {
          let Address = JSON.parse(localStorage.getItem('currentPosition')).address;
          let respPos = JSON.parse(localStorage.getItem('currentPosition')).respectivePosition;
          setCurrentPosition(respPos);
          document.querySelector('#address-input').value = Address;
          setAddress(Address);
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
  }, [address])

  function cnpjMask(e) {

    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
  }
  function cpfMask(e) {

    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + (x[4] ? '-' + x[4] : '');
  }
  function telMask(e) {

    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + '-' + x[3];
  }
  function handleSelectImages(event) {

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    })

    setImagesPreview(selectedImagesPreview);

  }
  function handleDeleteImg(){
    
  }

  async function handleSubmit() {
    setName(document.getElementById('name-input').value);
    setCpfCnpj(document.getElementById('cpfcnpj-input').value);
    setAddress(document.getElementById('address-input').value);
    setbusinessLine(document.getElementById('businessline-input').value);
    setAbout(document.getElementById('about-input').value);
    setContactName(document.getElementById('contact_name-input').value);
    setContactCel(document.getElementById('contact_cel-input').value);
    setContactBusiness_Position(document.getElementById('contact_business_position-input').value);

    const myForm = document.getElementById('form-data');

    const formData = new FormData(myForm);

    formData.append('name', name);
    formData.append('cpfcnpj', String(cpfcnpj));
    formData.append('address', address);
    formData.append('latitude', String(currentPosition[0]));
    formData.append('longitude', String(currentPosition[1]));
    formData.append('about', about);
    formData.append('contactName', contactName);
    formData.append('contactCel', String(contactCel));
    formData.append('contactBusiness_position', contactBusiness_position)

    images.forEach(
      (image) => {
        formData.append('images', image);
      });

    console.log(
      currentPosition,
      name,
      cpfcnpj,
      address,
      businessLine,
      about,
      contactName,
      contactCel,
      contactBusiness_position,
      images
    );

    try {
      await api.post('create-client', formData)
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div id="page-create-client">
        <Sidebar />
        <main>
          <form className="create-client-form" id="form-data">
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
                <label htmlFor="name-input">Razão Social</label>
                <input id="name-input"
                  onChange={
                    (event) => {
                      setName(event.target.value);
                    }}
                />
              </div>
              <div className="input-block">
                <div className="radio-input">
                  <input className="radio" type="radio" id="radio-cpf" name="cpf-cnpj" />
                  <label htmlFor="radio-cpf">CPF</label>
                  <input className="radio" type="radio" id="radio-cnpj" name="cpf-cnpj" />
                  <label htmlFor="radio-cnpj">CNPJ</label>
                </div>
                <input id="cpfcnpj-input" onChange={
                  (event) => {
                    if (document.getElementById('radio-cpf').checked) {
                      cpfMask(event);
                      setbusinessLine("Consumidor final")
                      setCpfCnpj(event.target.value);
                      document.getElementById('businessline-input').disabled = true;
                    } else {
                      cnpjMask(event);
                      setCpfCnpj(event.target.value);
                      document.getElementById('businessline-input').disabled = false;
                    }
                  }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="address-input">Endereço</label>
                <input id="address-input"
                  onChange={
                    (event) => {
                      setAddress(event.target.value);
                    }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="businessline-input">Ramo do Negócio</label>
                <input list="businesslines" name="businessline" id="businessline-input"
                  onChange={
                    (event) => {
                      setbusinessLine(event.target.value);
                    }}
                />
                <datalist id="businesslines">
                  <option value="Supermercados" />
                  <option value="Mercearias" />
                  <option value="Padarias" />
                  <option value="Lanchonetes" />
                  <option value="Lojas de Roupas" />
                  <option value="Lojas de Variedades" />
                  <option value="Consumidor final" />
                </datalist>
              </div>

              <div className="input-block">
                <label htmlFor="about-input">Sobre <span>Máximo de 300 caracteres</span></label>
                <textarea id="about-input" maxLength={300}
                  onChange={
                    (event) => {
                      setAbout(event.target.value);
                    }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>
                <div className="uploaded-image">
                </div>

                <div className="images-container">
                  {
                    imagesPreview.map(image => {
                      return (
                        <button type="button">
                          <img key={image} src={image} alt={name} />
                          <VscChromeClose
                            id="vsc-close"
                            color="#72e175"
                            onClick={handleDeleteImg}
                          />
                        </button>
                      )
                    })
                  }
                  <label htmlFor="image[]" className="new-image">
                    <FiPlus size={24} color="#72e175" />
                  </label>
                </div>
                <input multiple onChange={handleSelectImages} type="file" id="image[]" />
              </div>
            </fieldset>
            <fieldset>
              <legend>Contato</legend>

              <div className="input-block">
                <label htmlFor="contact-name">Nome</label>
                <input id="contact_name-input"
                  onChange={
                    (event) => {
                      setContactName(event.target.value);
                    }}
                />
              </div>
              <div className="input-block">
                <label htmlFor="contact_cel-input">
                  <FaWhatsapp size={40} color="#39CC83" />
                    Telefone
                  </label>
                <input id="contact_cel-input"
                  onChange={
                    (event) => {
                      telMask(event);
                      setContactCel(event.target.value);
                    }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="business-position">Cargo</label>
                <input id="contact_business_position-input"
                  onChange={
                    (event) => {
                      setContactBusiness_Position(event.target.value);
                    }}
                />
              </div>
            </fieldset>

            <button type="button" className="confirm-button" onClick={handleSubmit}>
              Confirmar
          </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default CreateClient;