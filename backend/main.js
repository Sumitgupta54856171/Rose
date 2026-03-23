const express = require('express')
const cors = require('cors')
const connect = require('./config/mongodb')
const router = require('./controller/datdasave')
const ejs = require('ejs')
const path = require('path')

require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.static('public'));
app.use(cors())
app.use(express.static(path.join(__dirname,'/views')));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/students',router)
const corsOptions = {
  origin: 'http://localhost:3000', // Change to your frontend domain
  methods: 'GET,POST,PUT,DELETE',
};
app.get('/',(req,res)=>{
    res.json({message:'server is running'})
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
    connect()
})

