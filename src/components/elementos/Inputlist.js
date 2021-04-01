import React from 'react';

function Inputlist(props) {
  return (
    <div>
      <form action="/action_page.php" method="get">
        <input list="browsers" name="browser" id="browser" />
        <datalist id="browsers">
          <option value="Supermercados" />
          <option value="Mercearias" />
          <option value="Padarias" />
          <option value="Lanchonetes" />
          <option value="Lojas de Roupas" />
          <option value="Lojas de Variedades" />
          <option value="Consumidor final" />
        </datalist>
      </form>

    </div>
  );
}

export default Inputlist;