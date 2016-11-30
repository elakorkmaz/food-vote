const express = require('express'),
      displayRoutes = require('express-routemap'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),

      pug = require('pug');

var db = require('./models');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'pug');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('users/new');
});

app.post('/users', (req,res) => {
  console.log(req.body)
  db.User.create(req.body).then((user) =>{
    console.log(req.body)
  res.redirect('/');
}).catch(() => {
  res.redirect('/register');
  });
});

app.get('/:slug', (req, res) => {
  db.meal.findOne({
    where: {
      slug: req.params.slug
    }
  }).then((Meal) => {
    res.render('/show', { meal: meal });
  }).catch((error) => {
    res.status(404).end();
  });
});

db.sequelize.sync().then(() => {
  console.log('connected to database');
  app.listen(3000, () => {
    console.log('server is now running on port 3000');
    displayRoutes(app);
  });
});
