import React, { Component } from 'react';
import FormS1 from './Rform/FormS1';
import FormS2 from './Rform/FormS2';
import FormS3 from './Rform/FormS3';
import FormS4 from './Rform/FormS4';
import FormS5 from './Rform/FormS5';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';


export class UserForm extends Component {
    state = {
        step: 1,
        name: '',
        email: '',
        gender: '',
        preferredTime: '',
        regNo: '',
        dept: '',
        whatsapp: '',
        phone: '',
        skillset: '',
        link: '',
        errors: {
            name: false,
            email: false,
            gender: false,
            preferredTime: false,
            regNo: false,
            dept: false,
            whatsapp: false,
            phone: false,
            skillset: false,
            link: true
        }
    };

    url = 'https://script.google.com/macros/s/AKfycbzSrlRIGOLVatQ9nxW9q06znXqtX4FCnXcefgqUVvUTU1TC647o/exec'

    closeForm = this.props.closeForm

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        if (step === 1) {
            const { name, email, regNo } = this.state;
            if (!this.checkValidation2({ 'name': name, 'email': email, 'regNo': regNo })) this.setState({ step: 2 })
        } else if (step === 2) {
            const { phone, whatsapp } = this.state;
            if (!this.checkValidation2({ 'phone': phone, 'whatsapp': whatsapp })) this.setState({ step: 3 })
        } else if (step === 3) {
            const { gender, dept } = this.state;
            if (!this.checkValidation2({ 'gender': gender, 'dept': dept })) this.setState({ step: 4 })
        }
        else if (step === 4) {
            const { skillset, preferredTime, dept } = this.state;
            if (dept === 'Management') {
                if (!this.checkValidation2({ 'skillset': skillset, 'preferredTime': preferredTime })) this.setState({ step: 5 })
            } else if (!this.checkValidation2({ 'skillset': skillset })) this.setState({ step: 5 })
        }
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    validateEmail(email) {
        // const re = /([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)@vitstudent([.])ac([.])in/g; //VIT EMAIL
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateRegNo(reg) {
        const re = /([0-9]{2})([a-zA-Z]{3})([0-9]{4})/g;
        return re.test(reg);
    }

    validatePhone(ph) {
        const re = /([0-9]{10})/g
        return re.test(ph)
    }

    checkValidation2 = (values) => {
        var newErrors = { ...this.state.errors };
        for (var i in values)
            this.checkValidation(i, values[i], newErrors);
        if (Object.keys(values).length === 1)
            this.setState({ errors: newErrors, [i]: values[i] });
        else
            this.setState({ errors: newErrors });
        console.log({ newErrors });
        for (i in values)
            if (newErrors[i]) return true
        return false
    }

    checkValidation = (input, newVal, newErrors) => {
        switch (input) {
            case 'name':
                if (newVal === '') newErrors.name = true;
                else newErrors.name = false;
                break;
            case 'regNo':
                if (!this.validateRegNo(newVal)) newErrors.regNo = true;
                else newErrors.regNo = false;
                break;
            case 'email':
                if (!this.validateEmail(newVal)) newErrors.email = true;
                else newErrors.email = false;
                break;
            case 'phone':
                if (!this.validatePhone(newVal)) newErrors.phone = true;
                else newErrors.phone = false;
                break;
            case 'whatsapp':
                if (!this.validatePhone(newVal)) newErrors.whatsapp = true;
                else newErrors.whatsapp = false;
                break;
            case 'gender':
                if (newVal === '') newErrors.gender = true;
                else newErrors.gender = false;
                break;
            case 'dept':
                if (newVal === '') newErrors.dept = true;
                else newErrors.dept = false;
                break;
            case 'skillset':
                if (newVal === '') newErrors.skillset = true;
                else newErrors.skillset = false;
                break;
            case 'preferredTime':
                if (newVal === '') newErrors.preferredTime = true;
                else newErrors.preferredTime = false;
                break;
            default:
                break;
        }
    }

    // Handle fields change
    handleChange = input => e => {
        // this.setState({ [input]: e.target.value });
        this.checkValidation2({ [input]: e.target.value });
    };

    formStep = () => {
        const { name, email, gender, preferredTime, regNo, dept, whatsapp, phone, skillset, link, step, errors } = this.state;
        const values = { name, email, gender, preferredTime, regNo, dept, whatsapp, phone, skillset, link, errors };

        switch (step) {
            case 1:
                return (
                    <FormS1
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 2:
                return (
                    <FormS2
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 3:
                return (
                    <FormS3
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 4:
                return (
                    <FormS4
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 5:
                return (
                    <FormS5
                        values={values}
                        closeForm={this.props.closeForm}
                        snackSuccess={this.props.snackHandleSuccess}
                        snackError={this.props.snackHandleError}
                    />
                )
            default:
                return (
                    <></>
                )
        }
    }

    formActions = () => {
        const { step } = this.state;

        switch (step) {
            case 1:
                return (
                    <DialogActions>
                        <Button onClick={this.closeForm} color="primary" autoFocus>
                            Close
                        </Button>
                        <Button onClick={this.nextStep} color="primary" autoFocus>
                            Continue
                        </Button>
                    </DialogActions>
                );
            case 2:
            case 3:
            case 4:
                return (
                    <DialogActions>
                        <Button onClick={this.prevStep} color="primary" autoFocus>
                            Go Back
                        </Button>
                        <Button onClick={this.nextStep} color="primary" autoFocus>
                            Continue
                        </Button>
                    </DialogActions>
                );
            case 5:
                return (
                    <DialogActions>
                        <Button onClick={this.prevStep} color="primary" autoFocus>
                            Go Back
                        </Button>
                    </DialogActions>
                );
            default:
                return (
                    <></>
                )
        }
    }

    onSubmit = () => {
        console.log(this.state);
    }

    render() {
        const { step } = this.state;
        return (
            <div className="dialogue">
                <Typography
                    variant='subtitle1'
                    align='center'
                    children={`Step ${step} of 5`}
                />
                <DialogContent>
                    <this.formStep />
                </DialogContent>
                <div style={{ padding: '30px 20px 0 20px' }} >
                    <Typography
                        variant="caption"

                        className="form-footer"
                        children={
                            <span>If you find any difficulty filling the form, feel free to contact &nbsp;
                                <a style={{ display: 'inline' }} href="tel:+919873734018">Vinayak (9873734018)</a> &amp; &nbsp;
                                <a style={{ display: 'inline' }} href="tel:+918290469207">Vinamra (8290469207)</a>
                            </span>
                        }
                    />
                </div>
                <this.formActions />
            </div>
        )
    }
}

export default UserForm;