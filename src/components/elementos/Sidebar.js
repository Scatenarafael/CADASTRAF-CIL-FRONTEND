import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import iconSlogan from '../../images/icon.svg'
import '../../styles/components/sidebar.css';

function Sidebar(props) {
  const { goBack } = useHistory();
  return (
    <aside className={"app-sidebar"}>
      <img src={iconSlogan} alt="Cadastra Fácil" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={30} />
        </button>
      </footer>
    </aside>
  );
}

export default Sidebar;