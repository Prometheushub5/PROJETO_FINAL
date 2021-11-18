import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoutes from './private.routes';

import Home from "./views/Home";
import Cursos from "./views/Cursos";
import Cadastro from "./views/Cadastro";
import Login from "./views/Login";
import Consultor from "./views/Consultor";
import Curso from "./views/Curso";
import Leads from "./views/Leads";
import Lead from "./views/Lead";
import Logout from "./views/Logout";
import EditCurso from "./views/EditCurso";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Cursos} />
        <Route path="/curso/:id" component={Curso} />
        <Route path="/cursos" exact component={Cursos} />
        
        <Route path="/login" component={Login} />
        <Route path="/cadastro" component={Cadastro} />
        <PrivateRoutes path="/consultor" exact component={Consultor} />
        <PrivateRoutes path="/leads" exact component={Leads}/>
        <PrivateRoutes path="/lead/:id" exact component={Lead}/>
        <PrivateRoutes path="/logout" exact component={Logout}/>
        <PrivateRoutes path="/editarcurso/:id" component={EditCurso} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;