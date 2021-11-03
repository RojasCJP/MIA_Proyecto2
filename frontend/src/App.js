import logo from './logo.svg';
import { Navbar } from './components/navbar';
import { Administrador } from './components/administrador';
import { Aplicante } from './components/aplicante';
import { Departamento } from './components/departamento';
import { Guest } from './components/guest';
import { Revisor } from './components/revisor';
import { Login } from './components/login';
import { Datos } from './components/datos';
import { Usuarios } from './components/usuarios';
import { Router, Switch, Route } from 'react-router-dom';
import './App.css';
import history from './history/history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/administrador" component={Administrador} />
          <Route exact path="/aplicante" component={Aplicante} />
          <Route exact path="/departamento" component={Departamento} />
          <Route exact path="/guest" component={Guest} />
          <Route exact path="/" component={Guest} />
          <Route exact path="/usuarios" component={Usuarios} />
          <Route exact path="/revisor" component={Revisor} />
          <Route exact path='/datos' component={Datos} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
