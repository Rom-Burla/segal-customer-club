"use strict";
let registrationForm = document.getElementById('registration-form');
// registration form inputs
let regName = document.getElementById('regName');
let regPhone = document.getElementById('regPhone');
let regOtherPhone = document.getElementById('regOtherPhone');
let regMail = document.getElementById('regMail');
let regStreet = document.getElementById('regStreet');
let regHouseNum = document.getElementById('regHouseNum');
let regApartementNum = document.getElementById('regApartementNum');
let regCity = document.getElementById('regCity');
// end of registration form inputs
// regex
const phoneRegexR = new RegExp('^\\+?(972|0)(\\-)?0?(([23489]{1}\\d{7})|[5]{1}\\d{8})$');
const hebNameRegexR = /[\u0590-\u05FF\u200f\u200e ]{2,9}((([-\s]{1})[\u0590-\u05FF\u200f\u200e]{2,9}))?((([-\s]{1})[\u0590-\u05FF\u200f\u200e]{2,9}))/iu;
const hebStreetRegexR = /[\u0590-\u05FF\u200f\u200e]{2,9}[-\s]{0,1}[\u0590-\u05FF\u200f\u200e]{0,9}[-\s]{0,1}[\u0590-\u05FF\u200f\u200e]{0,9}/iu;
const numRegexR = new RegExp('^[0-9]{0,3}$');
const emailRegexR = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
//end of regex
// form validation
registrationForm.addEventListener('submit', (evt) => {
    if (regName.value.length === 0) {
        evt.preventDefault();
        alert('שם מלא ריק והוא שדה חובה');
    }
    else {
        hebNameValidationR(evt, regName, 'שם מלא');
        if (regPhone.value.length === 0) {
            evt.preventDefault();
            alert('טלפון ריק והוא שדה חובה');
        }
        else {
            PhonevalidationR(evt, regPhone, 'מספר טלפון');
            if (regStreet.value.length === 0) {
                return null;
            }
            else {
                hebStreetValidationR(evt, regStreet, 'רחוב');
                if (regHouseNum.value.length === 0) {
                    return null;
                }
                else {
                    houseNumValidationR(evt, regHouseNum, 'מספר בית');
                    if (regApartementNum.value.length === 0) {
                        return null;
                    }
                    else {
                        apartementNumValidationR(evt, regApartementNum, 'מספר דירה/ כניסה');
                        if (regCity.value.length === 0) {
                            evt.preventDefault();
                            alert('שדה עיר ריק והוא שדה חובה');
                        }
                        else {
                            cityValidationR(evt, regCity, 'עיר');
                            if (regOtherPhone.value.length === 0) {
                                return null;
                            }
                            else {
                                emailValidationR(evt, regMail, 'אימייל');
                                PhonevalidationR(evt, regOtherPhone, 'מספר הטלפון הנוסף');
                            }
                        }
                    }
                }
            }
        }
    }
});
//end of form validation
// validation functions
function hebNameValidationR(evt, input, inputLabel) {
    let test = input.value.match(hebNameRegexR);
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function PhonevalidationR(evt, input, inputLabel) {
    let test = input.value.match(phoneRegexR);
    if (test === null) {
        alert(inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function hebStreetValidationR(evt, input, inputLabel) {
    let test = input.value.match(hebStreetRegexR);
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function houseNumValidationR(evt, input, inputLabel) {
    let test = input.value.match(numRegexR);
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function apartementNumValidationR(evt, input, inputLabel) {
    let test = input.value.match(new RegExp('^[0-9\\u0590-\\u05FF\\u200f\\u200e]{0,2}$'));
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function cityValidationR(evt, input, inputLabel) {
    let test = input.value.match(hebStreetRegexR);
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function emailValidationR(evt, input, inputLabel) {
    let test = input.value.match(emailRegexR);
    if (test === null) {
        alert('שדה ' + inputLabel + (' לא תקין'));
        input.value = '';
        evt.preventDefault;
    }
    else {
        return true;
    }
}
// end of validation functions
