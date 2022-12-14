"use strict";
let updateForm = document.getElementById('update-form');
// update form inputs
let upName = document.getElementById('upName');
let upPhone = document.getElementById('upPhone');
let upOtherPhone = document.getElementById('upOtherPhone');
let upMail = document.getElementById('upMail');
let upStreet = document.getElementById('upStreet');
let upHouseNum = document.getElementById('upHouseNum');
let upApartementNum = document.getElementById('upApartementNum');
let upCity = document.getElementById('upCity');
// end of update form inputs
// regex
const phoneRegexU = new RegExp('^\\+?(972|0)(\\-)?0?(([23489]{1}\\d{7})|[5]{1}\\d{8})$');
const hebNameRegexU = /[\u0590-\u05FF\u200f\u200e ]{2,9}((([-\s]{1})[\u0590-\u05FF\u200f\u200e]{2,9}))?((([-\s]{1})[\u0590-\u05FF\u200f\u200e]{2,9}))/g;
const hebStreetRegexU = /[\u0590-\u05FF\u200f\u200e]{2,9}[-\s]{0,1}[\u0590-\u05FF\u200f\u200e]{0,9}[-\s]{0,1}[\u0590-\u05FF\u200f\u200e]{0,9}/g;
const numRegexU = new RegExp('^[0-9]{0,3}$');
const emailRegexU = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const apartementNumRegexU = /^[0-9\u0590-\u05FF\u200f\u200e]{0,2}[\s]{0,1}[[0-9\u0590-\u05FF\u200f\u200e]{0,2}$/i;
//end of regex
// form validation
updateForm.addEventListener('submit', (evt) => {
    if (upName.value.length === 0) {
        evt.preventDefault();
        alert('שם מלא ריק והוא שדה חובה');
    }
    else {
        hebNameValidationU(evt, upName, 'שם מלא');
        if (upPhone.value.length === 0) {
            evt.preventDefault();
            alert('טלפון ריק והוא שדה חובה');
        }
        else {
            if (upCity.value.length === 0) {
                evt.preventDefault();
                alert('שדה עיר ריק והוא שדה חובה');
            }
            else {
                PhonevalidationU(evt, upPhone, 'מספר טלפון');
                if (upStreet.value.length === 0) {
                    null;
                }
                else {
                    hebStreetValidationU(evt, upStreet, 'רחוב');
                    if (upApartementNum.value.length === 0) {
                        null;
                    }
                    else {
                        apartementNumValidationU(evt, upApartementNum, 'מספר דירה/ כניסה');
                        cityValidationU(evt, upCity, 'עיר');
                        emailValidationU(evt, upMail, 'אימייל');
                        if (upOtherPhone.value.length === 0) {
                            null;
                        }
                        else {
                            PhonevalidationU(evt, upOtherPhone, 'מספר הטלפון הנוסף');
                            if (upHouseNum.value.length === 0) {
                                null;
                            }
                            else {
                                houseNumValidationU(evt, upHouseNum, 'מספר בית');
                            }
                        }
                    }
                }
            }
        }
    }
});
// end of form validation
// validation functions
function hebNameValidationU(evt, input, inputLabel) {
    let test = input.value.match(hebNameRegexU);
    if (test === null || input.value.match(/\d+/g)) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function PhonevalidationU(evt, input, inputLabel) {
    let test = input.value.match(phoneRegexU);
    if (test === null) {
        alert(inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function hebStreetValidationU(evt, input, inputLabel) {
    let test = input.value.match(hebStreetRegexU);
    if (test === null || input.value.match(/\d+/g)) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function houseNumValidationU(evt, input, inputLabel) {
    let test = input.value.match(numRegexU);
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function apartementNumValidationU(evt, input, inputLabel) {
    let test = input.value.match(apartementNumRegexU);
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function cityValidationU(evt, input, inputLabel) {
    let test = input.value.match(hebStreetRegexU);
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function emailValidationU(evt, input, inputLabel) {
    let test = input.value.match(emailRegexU);
    if (test === null) {
        alert('שדה ' + inputLabel + (' לא תקין'));
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
// end of validation functions
