import React, {Component} from 'react'
import PatientDetails from'./PatientDetails';
import './PatientsList.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class PatientsList extends Component {
  state = {
    patients: []
  }

  componentDidMount() {
    fetch('http://localhost:8080/patients/all')
    .then(res => res.json())
    .then((data) => {
      this.setState({ patients: data })
    })
    .catch(console.log)
  }

  handleClick(event) {
    return (
      <PatientDetails/>
    )
  }

  render () {
    return (
      <div>
        <center><h1 className="text-info display-4">Patients List</h1></center>
        {this.state.patients.map((patient) => (
          <div key={patient.name+patient.email} className="card">
            <Link to={{pathname: `/details/${patient.name}/${patient.email}`, query:'/all'}} className="button bg-light stretched-link" style={{ textDecoration: 'none' }}>
              <div className="card-body text-info">
                <h5 className="card-title">{patient.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{patient.email}</h6>
                <p className="card-text">{patient.phoneNumber}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    )
  };
}

export default PatientsList;