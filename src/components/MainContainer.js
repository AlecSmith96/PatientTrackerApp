import React, {Component} from 'react'
import { render } from '@testing-library/react';
import PatientsList from './PatientsList';
import PatientForm from './PatientForm';
import PatientDetails from './PatientDetails';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToDisplay: ''
        }
    }

    render() {
        if (this.state.componentToDisplay === 'patientsList') {
            return (<PatientsList/>)
        } 
        else if (this.state.componentToDisplay === 'patientForm') {
            return(<PatientForm/>)
        }
        else if (this.state.componentToDisplay === 'patientDetails') {
            return(<PatientDetails/>)
        }  
    }
}

 
export default MainContainer;