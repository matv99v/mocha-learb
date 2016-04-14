'use strict';

function validateRegistrationData(formData) {
    const validationRules = {
        name(value) {
            if (!value) {
                return 'Required';
            }

            if ( !value.match(/^[a-zа-яiъї]+$/i) ) {
                return 'Should contain only letters latin/cyrillic';
            }
        },

        email(value) {
            if (!value) {
                return 'Required';
            }

            /* eslint-disable max-len */
            const emailRe = /^([\w\-_+]+(?:\.[\w\-_+]+)*)@((?:[a-z0-9\-]+\.)*[a-z0-9][a-z0-9\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            if ( !emailRe.test(value || '') ) {
                return 'Wrong email format';
            }
        },

        username(value) {
            if (!value) {
                return 'Required';
            }

            if ( !value.match(/^[a-zа-яiъї]+$/i) ) {
                return 'Should contain only letters latin/cyrillic';
            }
        },

        password(value) {
            if (!value) {
                return 'Required';
            }

            if (value.length < 8) {
                return 'Should contain at least 8 characters';
            }

            if ( !value.match(/\d/) ) {
                return 'Should contain at least one digit';
            }

            if ( !value.match(/[^\da-z]/i) ) {
                return 'Should contain at least one special character';
            }

            if ( !value.match(/[A-Z]/) ) {
                return 'Should contain at least one uppercase letter';
            }

        },

        repassword(value) {
            if (!value) {
                return 'Required';
            }
        },

        phone(value) {
            if ( !value.match(/^[0-9+()\- ]*$/) ) {
                return 'Wrong number';
            }

        }
    };

    let errors = validateData(validationRules, formData);

    // Validate password equality
    if ( formData.password !== formData.repassword ) {
        errors = errors || {};
        errors.repassword = 'Should be equal to password';
    }

    // Validate birthday
    if (formData.day || formData.month || formData.year) {
        const birthday = new Date(+formData.year, +formData.month - 1, +formData.day);

        if ( isNaN( birthday.getTime() ) ) {
            errors = errors || {};
            errors.birthday = 'Invalid date';
        } else if ( birthday > new Date() ) {
            errors = errors || {};
            errors.birthday = 'Date should not be in future';
        }
    }

    return errors;
}


function validateData(validationRules, data) {
    const errors = {};

    for (const field in data) {
        const value      = data[field];
        const validator  = validationRules[field] || function() {};
        const fieldError = validator(value);

        if (fieldError) {
            errors[field] = fieldError;
        }
    }


    if ( Object.keys(errors).length ) {
        return errors;
    }
}

module.exports = {validateRegistrationData};
