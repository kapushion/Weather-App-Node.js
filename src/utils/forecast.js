

const request = require('request')


const forecast = (lat,langi, callback) => {

    const url = 'https://api.darksky.net/forecast/fe41ab94a4f8dafe26c46a2ffedd10fc/'+lat+','+langi+'?units=si'

    request({url ,json: true},(error,{body}) => {
        if(error) {
            callback('check the internet connection',undefined)
        } else if(body.error) {
            callback('unable to find location',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary+' It is currently '+ body.currently.temperature +' degrees out. There is a '+ body.currently.precipProbability+ '% chance of rain')
        }
    } )
}

module.exports = forecast;