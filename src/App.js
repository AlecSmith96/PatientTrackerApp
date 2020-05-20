import React, {Component} from 'react';
import PatientsList from './components/PatientsList';
import PatientForm from './components/PatientForm';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {

  render () {
    return (
      // https://www.codingame.com/playgrounds/6517/react-router-tutorial
      <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li><Link to={'/all'} className="nav-link">Patient List</Link></li>
          <li><Link to={'/add'} className="nav-link">Add Patient Record</Link></li>
        </ul>
        </nav>
        <hr />
        <Switch>
            <Route exact path='/all' component={PatientsList} />
            <Route path='/add' component={PatientForm} />
        </Switch>
      </div>
    </Router>
    )
  }
};

export default App
