## \* Hi read before you start the app:

## \* The purpose of this app is to select a specific customer in the attached sql database by his phone number and let him/her see and update his/her details

## \* first open the folder the app files are on with vscode

## \* to start the app you first need to download xampp and start apache and my sql

## in xampp press the button 'admin' near my sql open a new database and import the .sql file from the Database folder

## \* now you need to downlaod node.js

## \* after you downloaded those run the command npm init -y in the terminal (cmd or bash, powershell may cause problems)of vscode that the project is open on

## \* then run the command:

npm i --save-dev typescript ts-node express mysql ejs @types/express nodemon

## for the devDependencies in package.json

## \* check your package.json for the following scripts:

"scripts": {
"dev": "nodemon app.ts",
"ts:build": "tsc",
"prestart": "npm run ts:build",
"start": "node app.js"
},

## if it's not in the package.json copy and past the object of scripts above right affter the object of devDependencies right before the keywords object

## check your tsconfig.json for the following:

{
"compilerOptions": {
"target": "ES6",
"module": "CommonJS",
"moduleResolution": "node",
"allowJs": true,
"strict": true,
"esModuleInterop": true,
"skipLibCheck": true,
"forceConsistentCasingInFileNames": true
},
"include": [
"./**/*"
],
"exclude": [
"node_modules",
"**/*.spec.ts"
]
}

## if you don't have tsconfig.json open a file and name it tsconfig.json and paste the above object in the file

## now you can run the app by writing in the terminal the command:

npm start

## after the server will start you can access the app on:

http://localhost:3000/customer-club
