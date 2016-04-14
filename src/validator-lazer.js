'use strict';

function validateRegistrationData(formData) {
    const errors = {};
    const rules = {
        // TODO(implement better regexp)
        name: /^[а-яА-ЯёЁa-zA-Z]+$/,
        /* eslint-disable max-len */
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        // TODO(implement better regexp)
        username: /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
        passwordMinLength: /^[\s\S]{8,}$/,
        passwordDigit: /^(?=.*\d).+$/,
        passwordSpecial: /^(?=[\w!@#$%^&*()+]{6,})(?:.*[!@#$%^&*()+]+.*)$/,
        passwordUpperCase: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/,
        onlyDigits: /^[0-9]*$/,
        phone: /^\+?\(*[0-9]{1,3}\)*\d{3}-*\d{2}-*\d{1,5}$/
    };

    const messages = {
        required: 'Required',
        name: 'Should contain only letters latin/cyrillic',
        email: 'Wrong email format',
        username: 'Should contain only letters latin/cyrillic',
        passwordMinLength: 'Should contain at least 8 characters',
        passwordDigit: 'Should contain at least one digit',
        passwordSpecial: 'Should contain at least one special character',
        passwordUpperCase: 'Should contain at least one uppercase letter',
        repassword: 'Should be equal to password',
        birthdayInvalid: 'Invalid date',
        birthdayFuture: 'Date should not be in future',
        phone: 'Wrong number'
    };

    for (const field in formData) {
        if ( field === 'name' ) {
            const name = formData.name;
            if ( name === null || name === '' ) {
                errors.name = messages.required;
            } else if ( !rules.name.test(name) ) {
                errors.name = messages.name;
            }
        }

        if ( field === 'email' ) {
            const email = formData.email;
            if ( email === null || email === '' ) {
                errors.email = messages.required;
            } else if ( !rules.email.test(email) ) {
                errors.email = messages.email;
            }
        }

        if ( field === 'username' ) {
            const username = formData.username;
            if ( username === null || username === '' ) {
                errors.username = messages.required;
            } else if ( !rules.username.test(username) ) {
                errors.name = messages.username;
            }
        }

        if ( field === 'password' ) {
            const password = formData.password;
            if ( password === null || password === '' ) {
                errors.password = messages.required;
            } else if ( !rules.passwordMinLength.test(password) ) {
                errors.password = messages.passwordMinLength;
            } else if ( !rules.passwordDigit.test(password) ) {
                errors.password = messages.passwordDigit;
            } else if ( !rules.passwordSpecial.test(password) ) {
                errors.password = messages.passwordSpecial;
            } else if ( !rules.passwordUpperCase.test(password) ) {
                errors.password = messages.passwordUpperCase;
            }
        }

        if ( field === 'repassword' ) {
            const repassword = formData.repassword;
            const password = formData.password;
            if ( repassword === null || repassword === '' ) {
                errors.repassword = messages.required;
            } else if ( password !== repassword ) {
                errors.repassword = messages.repassword;
            }
        }

        if ( field === 'phone' ) {
            const phone = formData.phone;
            if (phone) {
                if ( !rules.phone.test(phone) ) {
                    errors.phone = messages.phone;
                }
            }
        }

    }


    function validateDate(month, day, year) {
        if (month || day || year) {
            if ( !rules.onlyDigits.test(month) ) {
                errors.birthday = messages.birthdayInvalid;
            } else if ( !rules.onlyDigits.test(day) ) {
                errors.birthday = messages.birthdayInvalid;
            } else if ( !rules.onlyDigits.test(year) ) {
                errors.birthday = messages.birthdayInvalid;
            } else {
                const currentTime = new Date().getTime();
                const userTime = new Date(year, month, day).getTime();
                if ( userTime > currentTime) {
                    errors.birthday = messages.birthdayFuture;
                }
            }
        }


    }

    validateDate(formData.month, formData.day, formData.year);

    // console.log(errors);
    return errors;
}

module.exports = {validateRegistrationData};
