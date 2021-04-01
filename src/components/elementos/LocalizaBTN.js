import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosition } from '../actions/mapActions'

function LocalizaBTN(props) {
  const chData = useSelector((state) => { return state });
  const dispatch = useDispatch();
  return (
    <div className="container-main">
      <button className="btn-loc" onClick={() => { dispatch(getPosition()) }} disabled={!chData.disabledEndInput}>Localizar!</button>
    </div>
  );
}

export default LocalizaBTN;