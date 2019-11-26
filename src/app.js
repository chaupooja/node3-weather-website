const path = require ('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Pooja'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message : 'This is an help page',
        title : 'Help Page',
        name : 'Pooja'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{ 
        title : 'About me',
        name : 'Pooja'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location} ={})=>{
        if (error){
            return res.send ({
                error
            })
        }

        forecast(latitude,longitude,(error,forecast)=>{
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })

        })

    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a serch term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get ('*',(req,res)=>{
    res.render('404',{
        title : 'Error',
        name : 'Pooja',
        errorMessage : 'This is an undeveloped page'

    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})