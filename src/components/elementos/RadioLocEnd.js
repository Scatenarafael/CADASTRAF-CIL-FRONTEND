import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { locDone, endDone } from '../actions/mapActions'


function RadioLocEnd(props) {
  const chData = useSelector((state) => { return state });
  const dispatch = useDispatch();

  return (
    <div className="container-ch-locend">
      <button className={`btn-locend-${chData.locCheck}`} onClick={() => { dispatch(locDone()) }}>Localização</button>
      <button className={`btn-locend-${chData.endCheck}`} onClick={() => { dispatch(endDone()) }}>Endereço</button>
    </div>
  );
}

export default RadioLocEnd;