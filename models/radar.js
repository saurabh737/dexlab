const request = require('request')
const constants = require('../lib/constants')
var fs = require('fs')

function radars(data) {
    return new Promise((resolve, reject) => {
        const options = {
            url: `${constants.radarUrl}`,
            method: "POST",
            headers: {
                token: "jbasdjbj"
            },
            body: {
                "date": data.date || new Date().toISOString().split('T')[0]
            },
            json: true
        }
        if (data.test) {
            resolve({
                radars: [
                    "FOP1",
                    "KABR",
                    "KABX",
                    "KAMA",
                ]
            })
        }
        request.post(options, (error, response, body) => {
            //console.log(error, body, response.statusCode)
            // body = JSON.parse(body)
            if (error) {
                if (typeof (error) === 'string') {
                    console.log(error)
                } else {
                    console.log(error.message)
                }
                reject(error)
            } else if (response.statusCode == 200) {
                resolve(body)
            } else if (response.statusCode == 400) {
                resolve({})
            }
        })
    })
}

function weatherPlot(headers, data) {
    return new Promise((resolve, reject) => {
        // resolve(true)
        const options = {
            url: `${constants.weatherUrl}`,
            method: "POST",
            headers: {
                token: "jbasdjbj",
                'Accept': 'image/png'
            },
            body: data,
            json: true
        }
        request(options)
            .pipe(fs.createWriteStream('c.png'))
            .on('error', function (err) {
                reject(err)
            })
            .on('close', () => {
                console.log("Done")
                resolve(true)
            });
    })
}

module.exports = {
    radars,
    weatherPlot
};