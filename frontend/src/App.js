import logo from './logo.svg';
import { Navbar } from './components/navbar';
import { Administrador } from './components/administrador';
import { Aplicante } from './components/aplicante';
import { Coordinador } from './components/coordinador';
import { Guest } from './components/guest';
import { Revisor } from './components/revisor';
import { Login } from './components/login';
import { Datos } from './components/datos';
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
          <Route exact path="/coordinador" component={Coordinador} />
          <Route exact path="/guest" component={Guest} />
          <Route exact path="/revisor" component={Revisor} />
          <Route exact path='/datos' component={Datos} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
