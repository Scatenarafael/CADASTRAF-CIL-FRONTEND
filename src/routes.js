import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Mapa from './components/abas/Mapa'
import Clients from './components/abas/Clients'
import CreateClient from './components/abas/CreateClient'
import ClientRegister from './components/abas/ClientRegister'


function Routes() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Mapa} />
          <Route path="/clientes" exact component={Clients} />
          <Route path="/clientes/create-client" component={CreateClient} />
          <Route path="/clientes/:id" component={ClientRegister} />
        </Switch>
      </BrowserRouter>
  );
}

export default Routes;