const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')

var port = process.env.PORT || 5000
const app = express()

app.get('/weather/:location', (req, res) => {
    if (!req.params.location) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.params.location, (error, { latitude, longitude, location }) => {
        if (error){
            return res.send({ error })
        }
        else{
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastdata,
                    location,
                    address: req.params.location
                })
            })
        }
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})