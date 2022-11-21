"use strict";
let childRegNo = document.getElementById('child-reg-no');
// child registration no children inputs
let childNameNo = document.getElementById('childNameNo');
let childAgeNo = document.getElementById('childAgeNo');
let userId = document.getElementById('userId');
// end of child registration no children inputs
// regex
const hebNameRegexN = /[\u0590-\u05FF\u200f\u200e]{2,9}[-\s]{0,1}[\u0590-\u05FF\u200f\u200e]{0,9}[-\s]{0,1}[\u0590-\u05FF\u200f\u200e]{0,9}/iu;
const ageRegexN = new RegExp('^[0-9]{1,2}$');
// end of regex
// form validation
childRegNo.addEventListener('submit', (evt) => {
    if (userId.value.length === 0) {
        evt.preventDefault();
        alert('המשתמש לא רשום');
    }
    else {
        if (childNameNo.value.length === 0) {
            evt.preventDefault();
            alert('השדה שם הילד ריק והוא שדה חובה');
        }
        else {
            hebNameValidationN(evt, childNameNo, 'שם הילד');
            if (childAgeNo.value.length === 0) {
                evt.preventDefault();
                alert('השדה גיל הילד ריק והוא שדה חובה');
            }
            else {
                childAgeValidationN(evt, childAgeNo, 'גיל הילד');
            }
        }
    }
});
// end of form validation
// validation functions
function hebNameValidationN(evt, input, inputLabel) {
    let test = input.value.match(hebNameRegexN);
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
function childAgeValidationN(evt, input, inputLabel) {
    let test = input.value.match(ageRegexN);
    if (test === null) {
        alert('שדה ' + inputLabel + ' לא תקין וחייב להיות עד 2 מספרים');
        input.value = '';
        evt.preventDefault();
    }
    else if (parseInt(input.value) > 14) {
        alert('גיל הילד חייב להיות קטן מ14');
        input.value = '';
        evt.preventDefault();
    }
    else {
        return true;
    }
}
