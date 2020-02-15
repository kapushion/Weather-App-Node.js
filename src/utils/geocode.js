const request = require('request')


const geoCode = (address, callback) => {

    // console.log(address);

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1Ijoia2FwdXNoaW9uIiwiYSI6ImNrNjd4OTAwODF1eHEzbXF3MXV6emZ0NDAifQ.3kGCZkvkDgFvJUMgkZuZvg'

    request({ url , json: true},(error,{body}) => {
        if(error) {
            callback('Unable to connect internet',undefined)
        } else if(!body.features.length) {
            callback('location is absurd', undefined)
        } else {
            let data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
            // console.log(response.body.features[0].center[0]);
        }
    })
}

module.exports = geoCode