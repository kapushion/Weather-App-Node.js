const hbs = require('hbs')
const path = require('path');
const express = require('express')
const request = require('request')
const geoCode = require('./utils/geocode')
const port = process.env.PORT || 3000
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname ,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'weather app',
        name: 'utkarsh'

    }
)
})


app.get('/about', (req,res)=> {
    res.render('about',{
        title: 'About Me',
        name: 'utkarsh'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'utkarsh'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        return res.send({
            error: 'message contains errors'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error) {
            return res.send({
                error:'errors are present'
            })
        } else {
            forecast(latitude,longitude,(error,forecastData) =>{
                if(error) {
                    return res.send({
                        error:'errors of forecast'
                    })
                } else {
                    res.send({
                        location: location,
                        forecast: forecastData
                    })
                }
            })
        }
    })

   
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'help page not found',
        name:'utkarsh'
    })
})

app.get('*', (req,res) =>{
    res.render('404', {
        title: '404 not found',
        name: 'utkarsh'
    })
})


app.listen(port,()=>{
    console.log('Server is up on port' + port)
})