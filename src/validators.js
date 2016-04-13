'use strict';

function validateRegistrationData(formData) {
    const errors = {};

    const criterions = {
        name: {
            matchTests: [
                {
                    regExp: /^[a-zа-я\u0451\u0491\u0454\u0456\u0457\u2019]*$/i,
                    errMsg: 'Should contain only letters latin/cyrillic'
                }
            ],
            carrier: 'name',
            required: true
        },

        email: {
            matchTests: [
                {
                    regExp: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z0-9.-]{2,}$/ig,
                    errMsg: 'Wrong email format'
                }
            ],
            carrier: 'email',
            required: true
        },

        username: {
            matchTests: [
                {
                    regExp: /^[a-zа-я\u0451\u0491\u0454\u0456\u0457\u2019]*$/i,
                    errMsg: 'Should contain only letters latin/cyrillic'
                }
            ],
            carrier: 'username',
            required: true
        },

        password: {
            matchTests: [
                {
                    regExp: /[A-Z]/,
                    errMsg: 'Should contain at least one uppercase letter'
                },
                {
                    regExp: /[^a-z0-9]+/i,
                    errMsg: 'Should contain at least one special character'
                },
                {
                    regExp: /\d+/i,
                    errMsg: 'Should contain at least one digit'
                },
                {
                    regExp: /.{8,}/i,
                    errMsg: 'Should contain at least 8 characters'
                }
            ],
            carrier: 'password',
            required: true
        },

        repassword: {
            matchTests: [
                {
                    regExp: /^(?!\s*$).+/,
                    errMsg: 'Require'
                }
            ],
            carrier: 'repassword',
            required: true
        },

        year: {
            matchTests: [
                {
                    regExp: /^\d{4}$|^$/,
                    errMsg: 'Invalid date'
                }
            ],
            carrier: 'birthday',
            required: false
        },

        month: {
            matchTests: [
                {
                    regExp: /^\d{0,2}$/,
                    errMsg: 'Invalid date'
                }
            ],
            carrier: 'birthday',
            required: false
        },

        day: {
            matchTests: [
                {
                    regExp: /^\d{0,2}$/,
                    errMsg: 'Invalid date'
                }
            ],
            carrier: 'birthday',
            required: false
        },

        phone: {
            matchTests: [
                {
                    regExp: /^[0-9+()-\s]*$/,
                    errMsg: 'Wrong number'
                }
            ],
            carrier: 'phone',
            required: false
        }
    };

// -----------------------checking RegExp tests--------------------------
    for (const field in formData) {
        if (criterions[field]) {
            const matchTestsArr = criterions[field].matchTests;    // array of regExp tests
            const carrier = criterions[field].carrier;
            const required = criterions[field].required;

            /* eslint-disable */
            matchTestsArr.forEach( claim => {
            /* eslint-disable */
                const isTestOk = claim.regExp.test(formData[field]);
                if (!isTestOk) errors[carrier] = claim.errMsg;
                if (required && !formData[field]) errors[carrier] = 'Required';
            });
        }
    }

// --------------------Is password === repassword--------------------
    if (formData.password !== formData.repassword) {
        errors.repassword = 'Should be equal to password';
    }

// --------------------Future date check--------------------
    const grantedDate = new Date(formData.year, formData.month, formData.day);
    if (grantedDate > Date.now()) {
        errors.birthday = 'Date should not be in future';
    }

    return errors;
}

module.exports = {validateRegistrationData};
