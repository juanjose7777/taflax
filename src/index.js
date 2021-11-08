const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');

const app = express();

app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs',exhbs ({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//variables gobales
app.use((req,res,next)=>{
       next();
});
//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));
//public
app.unsubscribe(express.static(path.join(__dirname, 'public')));
//iniciar
app.listen(app.get('port'),()=>{
    console.log('server listening on port', app.get('port'));
});