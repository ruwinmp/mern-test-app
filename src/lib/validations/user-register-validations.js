export const userRegisterValidations = (values) => {
    const errors = {};
    if (!values.firstName) errors.firstName = 'Required';
    if (!values.lastName) errors.lastName = 'Required';
    if (!values.email) errors.email = 'Required';
    if (!values.department) errors.department = 'Required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address'; 
    if (!values.username) errors.username = 'Required';
    if (!values.password) errors.password = 'Required';
    else if (!(values.password.length >= 8)) errors.password = 'Minimum length is 8'; 
    if (!values.confirmPassword) errors.confirmPassword = 'Required';
    else if (!(values.confirmPassword.length >= 8)) errors.confirmPassword = 'Minimum length is 8'; 
    else if (values.password !== values.confirmPassword) errors.confirmPassword = 'Confirm password is mismatched with the password'; 
    if (!values.address) errors.address = 'Required';
    return errors;
};