'use strict';

function validateRegistrationData(formData) {
    const errors = {};
    const regName = /^[а-яА-ЯёЁa-zA-Z]+$/i;
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9] + {1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regUsername = /^[a-zA-Z][a-zA-Z\.]{1,20}$/;
    const minMaxLength = /^[\s\S]{8,}$/,
        upper = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/,
        number = /^(?=.*\d).+$/,
        special = /^(?=[\w!@#$%^&*()+]{6,})(?:.*[!@#$%^&*()+]+.*)$/;
    const regDate = /^[0-9]*$/;
    const regPhone = /^\+?\(*[0-9]{1,3}\)*\d{3}-*\d{2}-*\d{1,5}$/;
    let newDate;



    for (const item in formData) {
        if (item === 'name') {
            if (formData[item] === '') {
                errors.name = 'Required';
            } else if (regName.test(formData[item])) {
                errors.name = '';
            } else {
                errors.name = 'Should contain only letters latin/cyrillic';
            }
        }

        if (item === 'email') {
            if (formData[item] === '') {
                errors.email = 'Required';
            } else if (regEmail.test(formData[item])) {
                errors.email = '';
            } else {
                errors.email = 'Wrong email format';
            }
        }

        if (item === 'username') {
            if (formData[item] === '') {
                errors.username = 'Required';
            } else if (regUsername.test(formData[item])) {
                errors.username = '';
            } else {
                errors.username = 'Should contain only letters latin/cyrillic';
            }
        }

        if (item === 'password') {
            if (formData[item] === '') {
                errors.password = 'Required';
            } else if (!minMaxLength.test(formData[item])) {
                errors.password = 'Should contain at least 8 characters';
            } else  if (!number.test(formData[item])) {
                errors.password = 'Should contain at least one digit';
            } else if (!special.test(formData[item])) {
                errors.password = 'Should contain at least one special character';
            } else if (!upper.test(formData[item])) {
                errors.password = 'Should contain at least one uppercase letter';
            } else {
                errors.password = '';
            }
        }

        if (item === 'repassword') {
            if (formData[item] === '') {
                errors.repassword = 'Required';
            } else if (formData['password'] !== formData[item]) {
                errors.repassword = 'Should be equal to password';
            }
        }

        if (item === 'month' || item === 'day' || item === 'year') {
            if (!regDate.test(formData['month'])) {
                errors.birthday = 'Invalid date';
            } else if (!regDate.test(formData['day'])) {
                errors.birthday = 'Invalid date';
            } else if (!regDate.test(formData['year'])) {
                errors.birthday = 'Invalid date';
            } else {
                const nowDate = new Date().getTime();
                const userDate = new Date(formData['year'], formData['month'], formData['day']).getTime();
                if (userDate > nowDate) {
                    errors.birthday = 'Date should not be in future';
                }
            }
        }

        if (item === 'phone') {
            if (formData['phone'] === '') {
                errors.phone = '';
            } else if (!regPhone.test(formData['phone'])) {
                errors.phone = 'Wrong number';
            }
        }
    }

    // console.log(errors);
    return errors;
}

module.exports = {validateRegistrationData};
