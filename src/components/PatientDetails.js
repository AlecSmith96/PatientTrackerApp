import React, {Component} from 'react';
import './PatientDetails.css';
import './react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { Overlay, Card, Modal, Button } from 'react-bootstrap';

class PatientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            deletePopupVisible: false,
            showModal: false,
            allergies: []
        }

        this.dischargePatient = this.dischargePatient.bind(this);
    }

    componentDidMount () {
        const { _id } = this.props.match.params;
        const {allergies } = this.props.match.params;
        console.log('ID: ' + _id);
        console.log('ALLERGIES: ' + allergies);
        fetch(`http://localhost:8080/patients/${_id}`)
        .then(res => res.json())
        .then((patientToDisplay) => {
            this.setState(() => ({ 
                patient: patientToDisplay,
                allergies: patientToDisplay.allergies
             }))
        })
    }

    submit = () => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => alert('Click Yes')
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        })
      };

    dischargePatient(patient) {
        fetch(`http://localhost:8080/patients/discharge/${patient._id}`, {method: 'POST'})
        this.props.history.push('/all');
        this.render();
    }

    showModal = () => {
        this.setState({ showModal: true });
    };

    hideModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        return (
        <div>
            <center>
                <br/>
                <div className="col-lg-8">
                <h1 className="text-info display-4">{this.state.patient.name}</h1>
                <Card>
                <Card.Header className="text-center">
                    <div id="editDetailsButton" className="btn col-lg-1">
                        <Button variant="outline-success" onClick={this.showModal} className="form-control">Edit Details</Button>
                    </div>
                    <div id="AddMedicationsButton" className="btn col-lg-1">
                        <Button variant="info" onClick={this.showModal} className="form-control">Add Medication</Button>
                    </div>
                    <div id="dischargeButton" className="btn col-lg-1">
                        <Button variant="outline-danger" onClick={this.showModal} className="form-control">Discharge Patient</Button>
                    </div>
                </Card.Header>
                <Card.Body className="text-left">
                    <Card.Title>{`Triaged on: ${this.state.patient.triageDate}`}</Card.Title>
                    <Card.Text>{`Date of Birth: ${this.state.patient.dateOfBirth}`}</Card.Text>
                    <Card.Text>{`Email Address: ${this.state.patient.email}`}</Card.Text>
                    <Card.Text>{`Telephone Number: ${this.state.patient.phoneNumber}`}</Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Card.Title>Allergies:</Card.Title>
                    {
                    this.state.allergies.map((allergy) => (
                        <div key={allergy.description} className="card">
                            <div className="card-body text-info">
                                <h5 className="card-title">{allergy}</h5>
                            </div>
                        </div>
                    ))}
                </Card.Footer>
                </Card>
                </div>
                <Modal show={this.state.showModal} onHide={this.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Discharge Patient?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Discharging patient will remove all records from the database.</Modal.Body>
                <Modal.Footer>
                <button variant="secondary" className="btn bg-info text-white" onClick={this.hideModal}>Close</button>
                <button variant="primary" className="btn bg-danger text-white" onClick={() => this.dischargePatient(this.state.patient)}>Discharge</button>
                </Modal.Footer>
                </Modal>
            </center>
        </div>
        )
    }
}
const container = document.createElement("div");
document.body.appendChild(container);

export default PatientDetails;