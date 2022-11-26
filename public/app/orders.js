"use strict";
let back = document.getElementById('back');
let link = document.createElement('a');
link.href = document.referrer;
let backBtn = document.createElement('button');
backBtn.textContent = 'חזרה לעמוד משתמש';
link.appendChild(backBtn);
back === null || back === void 0 ? void 0 : back.appendChild(link);
