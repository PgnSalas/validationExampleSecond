"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', formSend);

    const errorName = document.querySelector('.error-name');
    const errorEmail = document.querySelector('.error-email');
    const errorPhone = document.querySelector('.error-phone');  
    const errorPassword = document.querySelector('.error-password');

    async function formSend(e) {
        let error = formValidate(form);

        if (error === 0) {
            // The message that the form was send successfuly;
        } else {
            e.preventDefault();
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for(let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);
            
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if(input.classList.contains('_phone')) {
                if(phoneTest(input) || input.value == '') {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_password')) {
                if (passwordTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }

        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');

        if (input.classList.contains('_email')) {
            if (input.value.length === 0) {
                errorEmail.style = 'display: block';
                errorEmail.textContent = 'This field is empty';
            } else {
                errorEmail.style = 'display: block';
                errorEmail.textContent = 'This field is not correct. Example(dog@gmail.com)';
            }
        } else if(input.classList.contains('_name')) {
            errorName.style = 'display: block';
            errorName.textContent = 'This field is empty';
        } else if(input.classList.contains('_phone')) {
            if (input.value.length == 0) {
                errorPhone.style = 'display: block';
                errorPhone.textContent = 'This field is empty';
            } else {
                errorPhone.style = 'display: block';
                errorPhone.textContent = 'There must be obly numbers';
            }
        } else if(input.classList.contains('_password')) {
            if (input.value.length == 0) {
                errorPassword.style = 'display: block';
                errorPassword.textContent = 'This field is empty';
            } else {
                errorPassword.style = 'display: block';
                errorPassword.textContent = 'There is not one spesial symbol';
            }
        }
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');

        if (input.classList.contains('_email')) {
            errorEmail.style = 'display: none';
            errorEmail.textContent = '';
        } else if(input.classList.contains('_name')) {
            errorName.style = 'display: none';
            errorName.textContent = '';
        } else if (input.classList.contains('_phone')) {
            errorPhone.style = 'display: none';
            errorPhone.textContent = '';
        } else if (input.classList.contains('_password')) {
            errorPassword.style = 'display: none';
            errorPassword.textContent = '';
        }
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function phoneTest(input) {
        return /\D/g.test(input.value);
    }

    function passwordTest(input) {
        return !/[!@#$%^&]/g.test(input.value);
    }
});