import React, {Component} from 'react';

class PatientDetails extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         _id: ''
    //     }
    // }

    render() {
        return (
        <div>
            <h1>Patient Details</h1>
            <h1 value={this.props.name}/>
        </div>
        )
    }
}

export default PatientDetails;