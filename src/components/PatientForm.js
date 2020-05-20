import React, {Component} from 'react'

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
        this.forceUpdate();
    }

    render () {
        return (
            <div>
                <center>
                <h1>Add a new Patient record.</h1>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>  
                        <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
                </center>
            </div>
        )
    }
}

export default PatientForm;