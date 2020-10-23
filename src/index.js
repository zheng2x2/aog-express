const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.set('port', process.env.PORT || 8080);

// require('dotenv').config();
const { sequelize } = require('./models')
const User = require('./models/user');
const assistant = require('./webhooks'); 

const debug = require('debug');

console.log("dir >>>" +__dirname)
sequelize.authenticate()
  .then(()=>console.log('Database connected'))
  .catch(err=> console.log(err))
sequelize.sync( {force: false})
    .then( () => {
        console.log('postgres 연결 성공 !!')
    })
    .catch( err => {
        console.error(err)
    });

app.get('/', async (req, res ) => {
    //SELECT TEST
    const user = await User.findOne({});
    console.log(`user >>> ${user}`);
    // res.send(`Hello >>>> \n ${user.user_email}`);
    res.sendFile( __dirname+ "/views/"+"index.html" );
    // res.json();
});

//doPost
app.post('/fulfillment', assistant);

app.on('error', error => {
    console.error(error);
});

const server = app.listen(app.get('port'), () => {
    const port = server.address().port
    
    console.log(port, "에서 대기중 ..")
})
