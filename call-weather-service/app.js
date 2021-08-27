const express = require('express')
const request = require("request")
const redis = require('redis');

var port = process.env.PORT || 4000
const app = express()
const redisClient = redis.createClient(6379, 'docker-task_redis_1');

app.get('/weather/:location', (req, res) => {

    // redisClient.setex('location', 3600, req.params.location)
    let locs = []
    redisClient.rpush('locations', req.params.location)
    let previous_requests = redisClient.lrange('locations', 0, -1, (err, items) => {
        if (err) throw err
            items.forEach((item, i) => {
                locs.push(item)
        })
    })

    const url = 'http://docker-task_weather-service_1:5000/weather/' + req.params.location
    request({ url, json: true }, (error, response) => {
        if (error) {
            console.log(error)
        } else {
            res.send(`<h4>The weather for ${response.body.location} is:<br><h3>${response.body.forecast}<h3> <br><br>The previous weather requests were for:<br>${locs}</h4>`)
        }
    })
})

redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
