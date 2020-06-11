import React, {Component} from 'react';
import './PatientDetails.css';
import './react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { Card, Modal, Button } from 'react-bootstrap';
import AllergiesList from './AllergiesList';
import PersonalDetails from './PersonalDetails';

class PatientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            deletePopupVisible: false,
            showModal: false,
            allergies: [],
            editDetails: false,
            email: '',
            phoneNumber: ''
        }

        this.dischargePatient = this.dischargePatient.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.addAllergyField = this.addAllergyField.bind(this);
        this.addAllergyValue = this.addAllergyValue.bind(this);
        this.removeAllergyField = this.removeAllergyField.bind(this);
    }

    componentDidMount () {
        const { _id } = this.props.match.params;
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

    editPersonalDetails = () => {
        this.setState({ editDetails: true });
    } 

    sendUpdateRequest(data) {

    }

    saveChanges = () => {
        console.log(JSON.stringify(this.state.allergies));
        const data = `{"name": "${this.state.name}", "email": "${this.state.email}", "phoneNumber": "${this.state.phoneNumber}", "dateOfBirth": "${this.state.dateOfBirth}", "allergies": ${JSON.stringify(this.state.allergies)}}`;
        console.log(data);
        this.sendUpdateRequest(data);
        this.props.history.push('/all');
        this.render();
    }

    cancelChanges = () => {
        this.setState({editDetails: false});
    }

    showModal = () => {
        this.setState({ showModal: true });
    };

    hideModal = () => {
        this.setState({ showModal: false });
    };

    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        })
    }
    
    handlePhoneNumberChange(event) {
        this.setState({phoneNumber: event.target.value})
    }
    
    addAllergyField(allergy) {
        this.setState({allergies: [...this.state.allergies, '']});
    }
    
    addAllergyValue(event, index) {
        this.state.allergies[index] = event.target.value;
        this.setState({allergies: this.state.allergies});
    }
    
    removeAllergyField(index) {
        this.state.allergies.splice(index, 1);
        this.setState({allergies: this.state.allergies});
    }

    render() {
        return (
        <div>
            <center>
                <br/>
                <div className="col-lg-8">
                <h1 className="text-info display-4">{this.state.patient.name}</h1>
                <Card>
                <Card.Header className="text-center">
                    {
                        this.state.editDetails ?
                        <div id="cancelButton" className="btn col-lg-1" visible={this.state.editDetails}>
                            <Button variant="info" onClick={this.cancelChanges} className="form-control">Cancel</Button>
                        </div>
                        :
                        null
                    }
                    <div id="editDetailsButton" className="btn col-lg-1">
                        <Button variant="outline-success" onClick={!this.state.editDetails ? this.editPersonalDetails : this.saveChanges} className="form-control">{!this.state.editDetails ? 'Edit Details' : 'Save Changes'}</Button>
                    </div>
                    <div id="AddMedicationsButton" className="btn col-lg-1">
                        <Button variant="info" onClick={() => alert('Not Implemented.')} className="form-control">Add Medication</Button>
                    </div>
                    <div id="dischargeButton" className="btn col-lg-1">
                        <Button variant="outline-danger" onClick={this.showModal} className="form-control">Discharge Patient</Button>
                    </div>
                </Card.Header>
                <Card.Body className="text-left">
                    <PersonalDetails editDetails={this.state.editDetails} patient={this.state.patient} allergies={this.state.allergies}
                                     handleEmailChange={this.handleEmailChange} handlePhoneNumberChange={this.handlePhoneNumberChange} addAllergyField={this.addAllergyField}
                                     addAllergyValue={this.addAllergyValue} removeAllergyField={this.removeAllergyField}/>
                </Card.Body>
                <Card.Footer className="text-muted">
                
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