const express = require ('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const app = express();
const db = mongoose.connection;
const bcrypt = require('bcrypt')
require('dotenv').config();
const users = []

// Enviroment variables
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

//Controller
const usersController = require('./controllers/users')

// Middleware
// allows us to use put and delete methods
app.use(express.json())
app.use(methodOverride('_method'))
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }))

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true })
db.once('open', () => {
  console.log('connected to mongo')
})

// Error / Disconnection
db.on('error', (err) => console.log(`${err.message} is Mongod not running?`));
db.on('disconnected', () => console.log('mongo disconnected'));

//Routes
// app.use('/users', usersController);

app.get('/users',(req,res) => {
  res.json(users)
})

app.post('/users', async (req,res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10) /// salt 10 time 
    // console.log(salt)
    // console.log(hashedPassword)
    const user = {name: req.body.username, password: hashedPassword}
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req,res) => {
  const user = users.find(user => user.name === req.body.username)
  if (user == null) {
    return res.status(400).send('cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)){
      res.send('Success')
    }else {
      res.send('Restricted')
    }
  } catch{
    res.status(500).send()
  }
})


app.get('/',(req,res) => {
  res.send('index route')
})

app.get('/signup',(req,res) => {
  res.send('signup route')
})


app.listen(PORT, ()=> console.log('auth happengine on port',PORT))