import React, {Component} from 'react';
import PatientsList from './components/PatientsList';
import PatientForm from './components/PatientForm';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PatientDetails from './components/PatientDetails';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

class App extends Component {

  render () {
    return (
      <Router>
      <div>
      <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/all">Patient List</Nav.Link>
            <Nav.Link href="/add">Add Patient Record</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Patient Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
          <Route exact path='/all' component={PatientsList} />
          <Redirect from="/" to="/all" exact />
          <Route path='/add' component={PatientForm} />
          <Route path='/details/:_id' component={PatientDetails} />
      </Switch>
      </div>
    </Router>
    )
  }
};

export default App
