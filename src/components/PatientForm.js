import React, {Component} from 'react'
import './PatientForm.css';
import { Button } from 'react-bootstrap';


class PatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: new Date(),
            allergies: [],
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePhoneNumberChange(event) {
        this.setState({phoneNumber: event.target.value})
    }

    handleDobChange(event) {
        this.setState({dateOfBirth: event.target.value})
    }

    handleResponse = res => {
        if(res.ok) {
            alert('New patient added!');
        }
    }

    sendPostRequest(data) {
        fetch('http://localhost:8080/patients/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        })
        .then(this.handleResponse)
        .catch(function(error) {
            alert('An error occured, please try again');
        });
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

    /**
     * Submits form data to REST service and navigates back to PatientsList component.
     * @param {*} event 
     */
    handleSubmit(event) {
        const data = `{"name": "${this.state.name}", "email": "${this.state.email}", "phoneNumber": "${this.state.phoneNumber}", "dateOfBirth": "${this.state.dateOfBirth}", "allergies": ${JSON.stringify(this.state.allergies)}}`;
        this.sendPostRequest(data);
        this.props.history.push('/all');
        this.render();
    }

    render () {
        return (
            <div>
                <center>
                <h1 className="text-info display-4">Add a new Patient record.</h1>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                <div className="col-md-8">
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label text-left">Name: </label>  
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleNameChange} required placeholder="Enter full name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="dob" className="col-sm-2 col-form-label text-left">Date of Birth:</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" name="dob" value={this.state.dateOfBirth} onChange={this.handleDobChange} required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label text-left">Email:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleEmailChange} required placeholder="Enter email"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phoneNumber" className="col-sm-2 col-form-label text-left">Phone Number:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} required placeholder="Enter a phone number"/>
                        </div>
                    </div>
                    <hr/>
                    <div id="allergiesDiv" className="form-group row  col-sm-12">
                        <h1 className="text-info h4 float-left">Allergies</h1>
                        <Button variant="outline-info float-right" onClick={(allergy) => this.addAllergyField(allergy)}>Add New Allergy</Button>
                    </div>
                    {
                        this.state.allergies.map((allergy, index) => {
                            return (
                                <div key={index} className="form-group row col-sm-12 input-group">
                                    <input type="text" className="form-control" value={allergy} onChange={(newAllergy) => this.addAllergyValue(newAllergy, index)} placeholder="New Allergy"/>
                                    <button className="input-group-append form-control text-danger col-sm-2" onClick={() => this.removeAllergyField(index)}>Remove</button>
                                </div>
                            )
                        })
                    }
                    <hr/>
                    </div>
                    <div id="submitButton" className="form-group col-lg-1">
                        <input type="submit" className="form-control bg-info text-white" value="Submit"/>
                    </div>
                </form>
                </center>
            </div>
        )
    }
}

export default PatientForm;