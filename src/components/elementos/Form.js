import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGeocodePosition } from '../actions/mapActions'


function Form(props) {
  const chData = useSelector((state) => { return state });
  const dispatch = useDispatch();
  return (
    <div>
      <form action="" className="form">
        <label className="form-label">{`${props.desc} :`}</label>
        <input type="text" placeholder={props.desc} name={props.desc} id={`client-input-${props.desc}`} className="form-input" disabled={chData.disabledEndInput} onKeyPress={(event) => { dispatch(getGeocodePosition(event)) }} />
      </form>
    </div>
  );
}

export default Form;