const express = require('express');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');
const app = express();

app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts',
        defaultLayout: 'layout',
        extname: 'hbs',
    })
);
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.use('/authorization', function (request, response) {
    response.render('authorization', {
        btnText1: 'Авторизация',
    })
})
app.use('/registration', function (request, response) {
    response.render('registration', {
        btnText: 'Зарегистрироваться',
    })
})
app.use('/choose_chat', function (request, response) {
    response.render('choose_chat.hbs')
})
app.use('/profile', function (request, response) {
    response.render('profile.hbs')
})
app.use('/profile_edit', function (request, response) {
    response.render('profile_edit.hbs')
})
app.use('/profile_edit_pass', function (request, response) {
    response.render('profile_edit_pass.hbs')
})
app.use('/404', function (request, response) {
    response.render('404.hbs')
})
app.use('/500', function (request, response) {
    response.render('500.hbs')
})
app.use('/', function (request, response) {
    response.render('index.hbs')
})




app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});
