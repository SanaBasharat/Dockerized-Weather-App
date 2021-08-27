const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=69bbfc4789bee700fc38caa0174eaf75&query='+latitude+','+longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } 
        else if (body.error) {
            callback("Unable to find location.", undefined)
        } else {  
            callback(undefined, "It is currently "+body.current.temperature+" degrees, while it feels like "+body.current.feelslike+" degrees.")
        }
    })
}

module.exports = forecast