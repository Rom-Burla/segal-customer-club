"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const { join } = require("path");
const mysql = require('mysql');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require("cookie-parser");
const port = 3000;
// express uses
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(join(__dirname, "public")));
app.use(express.static("."));
app.use(cookieParser('secret session club'));
app.use(session({
    secret: 'cclub session',
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
// view engine
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
// database connection details
const connection = mysql.createConnection({
    host: 'segal-customers-service.cjfdavkdcwsh.eu-central-1.rds.amazonaws.com',
    user: "admin",
    password: "awstest1",
    database: "segal-customer",
    multipleStatements: true,
});
// error trace limit
Error.stackTraceLimit = Infinity;
// array of product objects
// const productsArr=[
//     {
//     sku: Math.floor(100000 + Math.random() * 100000),
//     manufacturer: "Stokke",
//     name: 'עגלת XPLORY SIGNATURE',
//     description: `Stokke® Xplory®  בצבע שחור סיגנצ’ר היא העגלה הנחשקת בקרב אמהות רבות בעולם – היא כל מה שאפשר לבקש מעגלה : מצד אחד שיא הפונקציונליות, מצד שני – שיא הסטייל. טרנדית, אבל גם טיימלס שתתגלגל איתכם שנים קדימה. יוקרה סקנדינבית במיטבה!
// מהדורה מוגבלת – שמציגה עיצוב וצבעים שלא יחזרו למלאי.
// זו הבחירה המושלמת להורים שרוצים את הטוב ביותר עבור התינוק שלהם מבלי להתפשר על בטיחות, איכות או סגנון. עגלה שהיא כולה פרימיום מלמעלה למטה. עגלה מעוצבת בעיצוב סקנדינבי חדשני בשילוב חומרים איכותיים הופכים את הטיול לקל פשוט וללא מאמץ או תמרון. עיצוב העגלה גבוה ובכך שומר על קשר עין שוטף עם התינוק -ומאפשר קרבה וחיבור – מעניק בטחון לכם ולבייבי שלכם.`,
//     minAge: 0,
//     maxAge: 5
//   },
//     {
//     sku: Math.floor(100000 + Math.random() * 100000),
//     manufacturer: "סגל בייבי",
//     name: 'מיטת ריי שחור-טבעי',
//     description: `מיטת ריי שחורה עוצבה מתוך ההבנה כי ריהוט שחור נכנס ללב הבית, ועכשיו גם לחדר התינוק. זוהי מיטה קלאסית רחבה במיוחד שמעניקה לעיצוב החדר דומננטיות שקטה. המיטה עשויה עץ בוק מלא עמיד וחזק, מיוצרת באיטליה ולה אישור תקן ו אישור בינלאומי Greenguard – המבטיח מיטה ללא רעלים.
// המיטה עוצבה מתוך חקירה והבנה של צוות המומחים שלנו שלמדו לשלב באופן מדויק בין הצרכים של התינוק ההורים והטרנדים העדכניים בתחום.
// ניתן להפוך את המיטה בקלות למיטת מעבר על ידי הרכבה של מעקה במקום אחת מהפאות הרחבות.`,
//     minAge: 0,
//     maxAge: 3
// },
//     {
//     sku: Math.floor(100000 + Math.random() * 100000),
//     manufacturer: "סגל בייבי",
//     name: 'שידה רומי',
//     description: `צבע גוף: לבן בשילוב עץ בוק
// צבע חזיתות: לבן
// חומר: MDF מלא איכותי וחזק (כולל פנים המגירות)
// גימור: אולטרא גלוס כולל ידיות עור ייחודיות ורגלי עץ בוק מעוצבות.
// יציבות מלאה: מוט פלדה מחושלת לחיזוק מבנה השידה לטווח ארוך.
// תאור : השידה מתאימה לאחסון מסודר של בגדי וחפצי התינוק לאורך זמן, הודות לגודל המגירות`,
//     minAge: 0,
//     maxAge: 99
// },
//     {
//     sku: Math.floor(100000 + Math.random() * 100000),
//     manufacturer: "סגל בייבי",
//     name: 'ארון אודם',
//     description: `ארון הוא פריט משמעותי בחדר ולכן המשימה של המעצבים שלנו היתה לפתח ארון גדול ולא מאיים – ואכן ניתן לראות כי העיצוב המינימסליטי מצליח לשמור על נינוחות ולהשאיר את החדר מאוורר. ארון שוהם עם 4 דלתות מעוצב כך שניתן להשתמש בו ל 2 ילדים ולהעניק סמטריה מושלמת בו זמנית. הפשטות הנקייה של הארון בשילוב ידיות לבנות נוחות המשתלבות בשקט מייצרות עיצוב עכשווי על זמני. העיצוב לא מעמיס ומעניק לפשטות יתרון בולט.הארון מתאים לסגנונות עיצוב רבים והוא מתוכנן בצורה חכמה. סידור הארון הפנימי גמיש וניתן להתאים אותו לצרכים המתפתחים של התינוק וההורים.`,
//     minAge: 0,
//     maxAge: 99
// }
// ]
// end of array of product objects
// array of user objects
// const usersArr = [
//     {
//         name: "רום בורלא",
//         phone: "0507273518",
//         otherPhone: '',
//         streetAddress: "שדרות ירושלים",
//         houseNum: "40",
//         apartement_num: '4',
//         city: 'חולון'
//     },
//     {
//         name: "אבי בוזגלו",
//         phone: "0523334897",
//         otherPhone: '0501234567',
//         streetAddress: "אבו חצירא",
//         houseNum: "8 א'",
//         apartement_num: '',
//         city: 'קריית מלאכי' 
//     },
//     {
//         name: "אלדר אברמוביץ'",
//         phone: '0527425389',
//         otherPhone: '0549876543',
//         streetAddress: "אביתר הכהן",
//         houseNum: "10",
//         apartement_num: "20",
//         city: "באר שבע"
//     },
// ]
// end of array of user objects
// array of child objects
// const childArr=[
//     {
//         name: 'אינשם',
//         age: '0.5',
//         user_id: 5
// },
//   {
//         name: 'שלמה',
//         age: '3',
//         user_id: 6
// },
//  {
//         name: "אבי ג'וניור",
//         age: '1',
//         user_id: 6
// },
//  {
//         name: 'בני',
//         age: '5',
//         user_id: 7
// },
//  {
//         name: 'מאיה',
//         age: '7',
//         user_id: 7
// },
//  {
//         name: 'סיוון',
//         age: '2',
//         user_id: 7
// }
// ]
// end of array of child objects
// dev insert manually into database function
// let insert = `INSERT INTO \`child_age\`(\`name\`, \`age\`, \`user_id\`) VALUES `
// let values = ''
// childArr.forEach((child,index)=>{
//  let sign = index === childArr.length - 1?';':',';
//  values+=`("${child.name}", ${child.age}, ${child.user_id})${sign}`
// })
// let builtQuery = insert + values;
// let insertChild = () => {
//    connection.query(builtQuery,(err = Error, result = String)=>{
//         if(err) console.log(err);
//         console.log(result);            
//    })
// }
// insertChild()
// end dev insert manually into database function
// Test query
// connection.query(`SELECT * FROM users JOIN child_age ON child_age.user_id=users.id`, (err:Error, res:Response)=>{
//     if(err)throw err
//     console.log(res);
// })
// End of test query
// Render homepage
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = `SELECT * FROM products`;
    yield connection.query(query, (err, result) => {
        if (err)
            throw err;
        if (!err) {
            const message = req.flash('success');
            res.render("index.ejs", { result, message });
        }
    });
}));
// Render registration page
app.get('/registration', (req, res) => {
    const message = req.flash('success');
    res.render('registration.ejs', { message });
});
// Render update page (by id)
app.get('/update/:id', (req, res) => {
    let id = req.params.id;
    let query = `SELECT * FROM users WHERE id = ?`;
    connection.query(query, [id], (err, result) => {
        if (err)
            throw err;
        if (!err) {
            const message = req.flash('success');
            res.render('update-cust-details.ejs', { result, message });
        }
    });
});
app.get('/orders/:id', (req, res) => {
    let id = req.params.id;
    let query = `SELECT users.id, users.name, orders.id AS \'order_id\', orders.order_day, orders.order_month, orders.order_year, products.product_name, quantity FROM order_product JOIN orders ON order_id = orders.id JOIN users ON orders.user_id = users.id JOIN products ON product_sku = products.sku WHERE users.id = ` + connection.escape(id);
    let query2 = `SELECT users.name, orders.id, orders.order_day, orders.order_month, orders.order_year, products.product_name, quantity FROM order_product
JOIN orders ON order_id = orders.id
JOIN users ON orders.user_id = users.id
JOIN products ON product_sku = products.sku
WHERE users.id = ` + connection.escape(id) + ` GROUP BY order_id`;
    connection.query(`${query};${query2}`, [1, 2], (err, result) => {
        if (err)
            throw err;
        if (!err) {
            console.log(result[0]);
            console.log(result[1]);
            res.render('orders.ejs', { result });
        }
    });
});
// Redirection to user specific page | registration page | user specific page without kids by the recived phone number
app.post('/getCustPhone', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let phoneInp = req.body.phoneInp;
    connection.query(`SELECT * FROM \`users\` JOIN child_age ON child_age.user_id=users.id WHERE \`phone\`= ?`, [phoneInp.toString()], (err, result) => {
        if (err)
            throw err;
        if (!err) {
            if (result.length > 0) {
                app.get("/" + phoneInp + "/children", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield connection.query(`SELECT * FROM \`users\` JOIN child_age ON child_age.user_id=users.id WHERE \`phone\`= ?`, [phoneInp.toString()], (err, result) => {
                        if (err)
                            throw err;
                        if (!err) {
                            const message = req.flash('success');
                            res.render("customer-w-children.ejs", { result, message });
                        }
                    });
                }));
                res.redirect("/" + phoneInp + "/children");
            }
            else if (result.length === 0) {
                app.get("/" + phoneInp, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield connection.query(`SELECT * FROM \`users\` WHERE \`phone\`= ?`, [phoneInp.toString()], (err, result) => {
                        if (err)
                            throw err;
                        if (!err) {
                            if (result.length > 0) {
                                res.render("customer.ejs", { result });
                            }
                            else {
                                res.redirect("/registration");
                            }
                        }
                    });
                }));
                res.redirect("/" + phoneInp);
            }
        }
    });
}));
// Insert user to database after filling the registration form
app.post('/registration', (req, res) => {
    let { name, phone, otherPhone, email, street, houseNum, apartementNum, city } = req.body;
    let query = `SELECT * FROM users WHERE email = ?`;
    connection.query(query, [email], (err, result) => {
        if (err)
            throw err;
        if (!err) {
            if (result.length > 0) {
                req.flash('success', 'אימייל כבר קיים במערכת');
                res.redirect('back');
            }
            else {
                let query = `SELECT * FROM users WHERE phone = ?`;
                connection.query(query, [phone], (err, result) => {
                    if (err)
                        throw err;
                    if (!err) {
                        if (result.length > 0) {
                            req.flash('success', 'הטלפון כבר קיים במערכת');
                            res.redirect('back');
                        }
                        else {
                            let query = `SELECT * FROM users WHERE phone = ?`;
                            connection.query(query, [otherPhone], (err, result) => {
                                if (err)
                                    throw err;
                                if (!err) {
                                    if (result.length > 0) {
                                        req.flash('success', 'הטלפון הנוסף כבר קיים במערכת');
                                        res.redirect('back');
                                    }
                                    else {
                                        let query = `SELECT * FROM users WHERE other_phone = ?`;
                                        connection.query(query, [phone], (err, result) => {
                                            if (err)
                                                throw err;
                                            if (!err) {
                                                if (result.length > 0) {
                                                    req.flash('success', 'הטלפון כבר קיים במערכת');
                                                    res.redirect('back');
                                                }
                                                else {
                                                    let query = `SELECT * FROM users WHERE other_phone = ?`;
                                                    connection.query(query, [otherPhone], (err, result) => {
                                                        if (err)
                                                            throw err;
                                                        if (!err) {
                                                            if (otherPhone.length > 0) {
                                                                if (result.length > 0) {
                                                                    req.flash('success', 'הטלפון הנוסף כבר קיים במערכת');
                                                                    res.redirect('back');
                                                                }
                                                            }
                                                            else {
                                                                let query = `INSERT INTO \`users\`( \`name\`, \`phone\`, \`other_phone\`, \`str_address\`, \`house_num\`, \`apartement_num\`, \`city\`, \`email\`) VALUES(?,?,?,?,?,?,?,?)`;
                                                                connection.query(query, [name, phone, otherPhone, street, houseNum.length === 0 ? houseNum = null : houseNum, apartementNum, city, email], (err, result) => {
                                                                    if (err)
                                                                        throw err;
                                                                    if (!err) {
                                                                        req.flash('success', 'נרשמת בהצלחה הכנס מספר טלפון כדי להכנס למשתמש');
                                                                        res.redirect(`/`);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});
// Insert new child from the user specific page childReg form
app.post('/childReg', (req, res) => {
    let { childName, childAge, user_id, user_phone } = req.body;
    let query = `SELECT * FROM \`users\` JOIN child_age ON id = child_age.user_id WHERE id = ? AND child_age.child_name = ?`;
    connection.query(query, [user_id, childName], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        if (!err) {
            if (result.length > 0) {
                app.get("/" + user_phone + "/children", (req, res) => {
                    connection.query(`SELECT * FROM \`users\` JOIN child_age ON child_age.user_id=users.id WHERE \`phone\`= ?`, [user_phone.toString()], (err, result) => {
                        if (err)
                            throw err;
                        if (!err) {
                            const message = req.flash('success');
                            res.render("customer-w-children.ejs", { result, message });
                        }
                    });
                });
                req.flash('success', `${childName} כבר רשום/ה במערכת`);
                res.redirect("/" + user_phone + "/children");
                console.log('duplicate');
            }
            else {
                let query = `INSERT INTO \`child_age\`(\`child_name\`, \`age\`, \`user_id\`) VALUES(?,?,?)`;
                connection.query(query, [childName, childAge, user_id], (err, result) => {
                    if (err)
                        throw err;
                    if (!err) {
                        let query = `SELECT * FROM \`users\` JOIN child_age ON id = child_age.user_id WHERE id = ?`;
                        connection.query(query, [user_id], (err, result) => {
                            if (err)
                                throw err;
                            if (!err) {
                                if (result.length > 1) {
                                    req.flash('success', `${childName} נרשם/ה במערכת`);
                                    res.redirect('back');
                                }
                                else {
                                    req.flash('success', `${childName} נרשם/ה במערכת הכנס מספר טלפון כדי לראות אותו/ה`);
                                    res.redirect('/');
                                }
                            }
                        });
                    }
                });
            }
        }
    }));
});
// Update user details from update form in user specific update page
app.post('/update/:id', (req, res) => {
    let id = req.params.id;
    let { name, phone, otherPhone, email, street, houseNum, apartementNum, city } = req.body;
    if (otherPhone.length === 0) {
        connection.query(`SELECT * FROM users WHERE id = ? AND phone = ?`, [id, phone], (err, result) => {
            if (result.length === 0) {
                connection.query(`SELECT * FROM users WHERE users.phone = ? OR users.other_phone = ?`, [phone, phone], (err, result) => {
                    if (result.length === 0) {
                        connection.query(`SELECT * FROM users WHERE id = ? AND email = ?`, [id, email], (err, result) => {
                            if (result.length === 0) {
                                connection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
                                    if (result.length === 0) {
                                        connection.query(`UPDATE users SET name = ?, phone=?, other_phone = ?, str_address = ?, house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                            req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                            res.redirect('back');
                                        });
                                    }
                                    else {
                                        req.flash('success', 'אימייל כבר קיים במערכת');
                                        res.redirect('back');
                                    }
                                });
                            }
                            else {
                                connection.query(`UPDATE users SET name = ?, phone=?, other_phone = ?, str_address = ?, house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                    req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                    res.redirect('back');
                                });
                            }
                        });
                    }
                    else {
                        req.flash('success', 'מספר טלפון כבר קיים במערכת');
                        res.redirect('back');
                    }
                });
            }
            else {
                connection.query(`SELECT * FROM users WHERE id = ? AND email = ?`, [id, email], (err, result) => {
                    if (result.length === 0) {
                        connection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
                            if (result.length === 0) {
                                connection.query(`UPDATE users SET name = ?, phone=?, other_phone = ?, str_address = ?, house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                    if (err)
                                        throw err;
                                    if (!err) {
                                        req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                        res.redirect('back');
                                    }
                                });
                            }
                            else {
                                req.flash('success', 'אימייל כבר קיים במערכת');
                                res.redirect('back');
                            }
                        });
                    }
                    else {
                        connection.query(`UPDATE users SET name = ?, phone=?, other_phone = ?, str_address = ?, house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                            if (err)
                                throw err;
                            if (!err) {
                                req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                res.redirect('back');
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        connection.query(`SELECT * FROM users WHERE id = ? AND phone = ?`, [id, phone], (err, result) => {
            if (result.length === 0) {
                connection.query(`SELECT * FROM users WHERE phone = ?`, [phone], (err, result) => {
                    if (result.length === 0) {
                        connection.query(`SELECT * FROM users WHERE phone = ? `, [otherPhone || phone], (err, result) => {
                            if (result.length === 0) {
                                connection.query(`SELECT * FROM users WHERE id = ? AND other_phone = ?`, [id, otherPhone], (err, result) => {
                                    if (result.length === 0) {
                                        connection.query(`SELECT * FROM users WHERE other_phone = ?`, [otherPhone], (err, result) => {
                                            if (result.length === 0) {
                                                connection.query(`SELECT * FROM users WHERE users.other_phone = ? OR users.phone = ?`, [phone, phone], (err, result) => {
                                                    if (result.length === 0) {
                                                        connection.query(`SELECT * FROM users WHERE id = ? AND email = ?`, [id, email], (err, result) => {
                                                            if (result.length === 0) {
                                                                connection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
                                                                    if (result.length === 0) {
                                                                        connection.query(`UPDATE users SET name = ?, phone = ?, other_phone = ?, str_address = ?, house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                                                            if (err)
                                                                                throw err;
                                                                            if (!err) {
                                                                                req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                                                                res.redirect('back');
                                                                            }
                                                                        });
                                                                    }
                                                                    else {
                                                                        req.flash('success', 'אימייל כבר קיים במערכת');
                                                                        res.redirect('back');
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                connection.query(`UPDATE users SET name = ?, phone = ?, other_phone = ?, str_address = ?, house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                                                    if (err)
                                                                        throw err;
                                                                    if (!err) {
                                                                        req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                                                        res.redirect('back');
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        req.flash('success', 'מספר הטלפון הנוסף כבר קיים במערכת');
                                                        res.redirect('back');
                                                    }
                                                });
                                            }
                                            else {
                                                req.flash('success', 'מספר הטלפון כבר קיים במערכת');
                                                res.redirect('back');
                                            }
                                        });
                                    }
                                    else {
                                        connection.query(`SELECT * FROM users WHERE id = ? AND email = ?`, [id, email], (err, result) => {
                                            if (result.length === 0) {
                                                connection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
                                                    if (result.length === 0) {
                                                        connection.query(`UPDATE users SET name = ?, phone = ?, other_phone = ?, str_address = ?, house_num = ?, apartement_num =?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                                            if (err)
                                                                throw err;
                                                            if (!err) {
                                                                req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        req.flash('success', 'אימייל כבר קיים במערכת');
                                                        res.redirect('back');
                                                    }
                                                });
                                            }
                                            else {
                                                connection.query(`UPDATE users SET name = ?, phone = ?, other_phone = ?, str_address = ?, house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                                    if (err)
                                                        throw err;
                                                    if (!err) {
                                                        req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                                        res.redirect('back');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                req.flash('success', 'מספר הטלפון הנוסף כבר קיים במערכת');
                                res.redirect('back');
                            }
                        });
                    }
                    else {
                        req.flash('success', 'מספר הטלפון כבר קיים במערכת');
                        res.redirect('back');
                    }
                });
            }
            else {
                connection.query(`SELECT * FROM users WHERE id = ? AND other_phone = ?`, [id, otherPhone], (err, result) => {
                    if (result.length === 0) {
                        connection.query(`SELECT * FROM users WHERE other_phone = ?`, [phone], (err, result) => {
                            if (result.length === 0) {
                                connection.query(`SELECT * FROM users WHERE users.other_phone = ? OR users.phone`, [otherPhone], (err, result) => {
                                    if (result.length === 0) {
                                        connection.query(`SELECT * FROM users WHERE id = ? AND email = ?`, [id, email], (err, result) => {
                                            if (result.length === 0) {
                                                connection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
                                                    if (result.length === 0) {
                                                        connection.query(`UPDATE users SET name = ?, phone = ?, other_phone = ?, str_address = ?, house_num = ?, apartement_num =?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                                            if (err)
                                                                throw err;
                                                            if (!err) {
                                                                req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                                                res.redirect('back');
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        req.flash('success', 'אימייל כבר קיים במערכת');
                                                        res.redirect('back');
                                                    }
                                                });
                                            }
                                            else {
                                                connection.query(`UPDATE users SET name = ?, phone = ?, other_phone = ?, str_address = ?, house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                                    if (err)
                                                        throw err;
                                                    if (!err) {
                                                        req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                                        res.redirect('back');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        req.flash('success', 'טלפון נוסף כבר קיים במערכת');
                                        res.redirect('back');
                                    }
                                });
                            }
                            else {
                                req.flash('success', 'טלפון כבר קיים במערכת');
                                res.redirect('back');
                            }
                        });
                    }
                    else {
                        connection.query(`SELECT * FROM users WHERE id = ? AND email = ?`, [id, email], (err, result) => {
                            if (result.length === 0) {
                                connection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
                                    if (result.length === 0) {
                                        connection.query(`UPDATE users SET name = ?, phone = ?, other_phone = ?, str_address = ?, house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                            req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                            res.redirect('back');
                                        });
                                    }
                                    else {
                                        req.flash('success', 'אימייל כבר קיים במערכת');
                                        res.redirect('back');
                                    }
                                });
                            }
                            else {
                                connection.query(`UPDATE users SET name = ?, phone = ?, other_phone = ?, str_address = ?,house_num = ?, apartement_num = ?, city = ?, email = ? WHERE id = ?`, [name, phone, otherPhone, street, houseNum, apartementNum, city, email, id], (err, result) => {
                                    if (err)
                                        throw err;
                                    if (!err) {
                                        req.flash('success', 'פרטי המשתמש עודכנו בהצלחה');
                                        res.redirect('back');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});
//        let query = `UPDATE \`users\` SET \`name\`=?,\`phone\`=?,\`other_phone\`=?,\`str_address\`=?,\`house_num\`=?,\`apartement_num\`=?,\`city\`=?,\`email\`=? WHERE \`id\` = ?`
// connection.query(query,[name,phone,otherPhone,street,houseNum,apartementNum,city,email,id],(err:Error,result:Array<Object>)=>{
//     if (err)throw err
//     if(!err){
//     console.log(result);
//     }
// })
//     req.flash('success', 'פרטי המשתמש עודכנו בהצלחה הכנס מספר טלפון כדי להכנס')
// res.redirect('/')
// req.flash('success', 'פרטי המשתמש עודכנו בהצלחה הכנס מספר טלפון כדי להכנס')
// res.redirect('/')
app.listen(port, (err, res) => {
    if (err) {
        res.redirect('/');
        console.log(err);
    }
    ;
    console.log('listening to port ' + port);
});
