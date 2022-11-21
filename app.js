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
const port = process.env.PORT || 3306;
// express uses
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(join(__dirname, "public")));
app.use(express.static("."));
// view engine
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
// database connection details
const connection = mysql.createConnection({
    host: 'segal-customers-service.cjfdavkdcwsh.eu-central-1.rds.amazonaws.com',
    user: "admin",
    password: "awstest1",
    database: "segal-customers-club",
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
            res.render("index.ejs", { result });
        }
    });
}));
// Render registration page
app.get('/registration', (req, res) => {
    res.render('registration.ejs');
});
// Render update page (by id)
app.get('/update/:id', (req, res) => {
    let id = req.params.id;
    let query = `SELECT * FROM users WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (err)
            throw err;
        if (!err) {
            res.render('update-cust-details.ejs', { result });
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
                            res.render("customer-w-children.ejs", { result });
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
    let query = `INSERT INTO \`users\`( \`name\`, \`phone\`, \`other_phone\`, \`str_address\`, \`house_num\`, \`apartement_num\`, \`city\`, \`email\`) VALUES("${name}","${phone}","${otherPhone}","${street}",${houseNum},"${apartementNum}", "${city}", "${email}")`;
    connection.query(query, (err, result) => {
        if (err)
            throw err;
        if (!err) {
            res.redirect(`/`);
        }
    });
});
// Insert new child from the user specific page childReg form
app.post('/childReg', (req, res) => {
    let { childName, childAge, user_id } = req.body;
    let query = `SELECT * FROM \`users\` JOIN child_age ON id = child_age.user_id WHERE id = 83 AND child_age.child_name LIKE '${childName}'`;
    connection.query(query, (err, checkResult) => {
        if (err)
            throw err;
        if (!err) {
            if (checkResult.length > 0) {
                console.log('child already exist');
            }
            else {
                let query = `INSERT INTO \`child_age\`(\`child_name\`, \`age\`, \`user_id\`) VALUES("${childName}",${childAge},${user_id})`;
                connection.query(query, (err, result) => {
                    if (err)
                        throw err;
                    if (!err) {
                        let query = `SELECT * FROM \`users\` JOIN child_age ON id = child_age.user_id WHERE id = ${user_id}`;
                        connection.query(query, (err, result) => {
                            if (err)
                                throw err;
                            if (!err) {
                                if (result.length > 1) {
                                    res.redirect('back');
                                }
                                else {
                                    res.redirect('/');
                                }
                            }
                        });
                    }
                });
            }
        }
    });
});
// Update user details from update form in user specific update page
app.post('/update/:id', (req, res) => {
    let id = req.params.id;
    let { name, phone, otherPhone, email, street, houseNum, apartementNum, city } = req.body;
    let query = `UPDATE \`users\` SET \`name\`='${name}',\`phone\`='${phone}',\`other_phone\`='${otherPhone}',\`str_address\`='${street}',\`house_num\`='${houseNum}',\`apartement_num\`='${apartementNum}',\`city\`='${city}',\`email\`="${email}" WHERE \`id\` = ${id}`;
    connection.query(query, (err, result) => {
        if (err)
            throw err;
        if (!err) {
            console.log(result);
        }
    });
    res.redirect('/');
});
app.listen(port, (err, res) => {
    if (err) {
        res.redirect('/');
        console.log(err);
    }
    ;
    console.log('listening to port ' + port);
});
