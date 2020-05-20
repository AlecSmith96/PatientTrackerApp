import React, {Component} from 'react'
import PatientDetails from'./PatientDetails';

class PatientsList extends Component {
  state = {
    patients: []
  }

  componentDidMount() {
    fetch('http://192.168.1.197:8080/patients/all')
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
        <center><h1>Patients List</h1></center>
        {this.state.patients.map((patient) => (
          <div key={patient._id} className="card">
            <div className="card-body">
              <h5 className="card-title">{patient.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{patient.email}</h6>
              <p className="card-text">{patient.phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>
    )
  };
}

export default PatientsList;