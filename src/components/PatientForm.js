import React, {Component} from 'react'
import './PatientForm.css';

class PatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phoneNumber: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
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

    sendPostRequest(data) {
        fetch('http://192.168.1.197:8080/patients/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        }).then(function(response) {
            alert('New patient added!');
        }).catch(function(error) {
            alert('An error occured, please try again');
        });
    }

    /**
     * Submits form data to REST service and navigates back to PatientsList component.
     * @param {*} event 
     */
    handleSubmit(event) {
        const data = `{"name": "${this.state.name}", "email": "${this.state.email}", "phoneNumber": "${this.state.phoneNumber}"}`;
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
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name: </label>  
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleNameChange} required placeholder="Enter full name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleEmailChange} required placeholder="Enter email"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Phone Number:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} required placeholder="Enter a phone number"/>
                        </div>
                    </div>
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