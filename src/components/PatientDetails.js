import React, {Component} from 'react';
import './PatientDetails.css';
import './react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { Overlay, Card } from 'react-bootstrap';

class PatientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            deletePopupVisible: false
        }
    }

    componentDidMount () {
        const { name } = this.props.match.params;
        fetch(`http://localhost:8080/patients/${name}`)
        .then(res => res.json())
        .then((patientToDisplay) => {
            console.log('Patient: '+patientToDisplay);
            this.setState(() => ({ patient: patientToDisplay }))
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

    // toggleOverlay(comp) {
    //     const newState = comp.deletePopupVisible ? 'false' : 'true';
    //     comp.setState({deletePopupVisible: newState});
    // }

    // handleClickDelete() {

    // }

    render() {
        return (
        <div>
            <center>
                <br/>
                <div className="col-lg-8">
                <Card className="text-center">
                <Card.Header><h1 className="text-info display-4">{this.state.patient.name}</h1></Card.Header>
                <Card.Body>
                <Card.Title>{`Email Address: ${this.state.patient.email}`}</Card.Title>
                    <Card.Text>
                        {`Telephone Number: ${this.state.patient.phoneNumber}`}
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
                <Card.Footer className="text-muted">
                <center>
                    <div id="dischargeButton" className="form-group col-lg-1">
                        <button onClick={this.submit} className="form-control bg-danger text-white">Discharge Patient</button>
                    </div>
                </center>
                </Card.Footer>
                </Card>
                </div>
                {/* <Overlay isVisible={this.state.deletePopupVisible} onBackdropPress={this.toggleOverlay(this)}>
                <div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this file?</p>
                    <button onClick={this.toggleOverlay(this)}>No</button>
                    <button onClick={() => {
                        this.handleClickDelete()
                    }}>Yes, Delete it!</button>
                </div>
                </Overlay> */}
            </center>
        </div>
        )
    }
}

export default PatientDetails;