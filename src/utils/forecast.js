const request = require('request');
const forecast = (latitude, longitude, callback) => {
    if(!latitude) {
        return callback("latitude needs to be inputed");
    }
    else if(!longitude) {
        return callback("longituited needs to be inputted");
    }
    const url = "http://api.weatherstack.com/current?access_key=7a1ed09dfff7acaf5c46a2693fda7f88&query=" + longitude + ","+latitude+"&units=f";
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback("unable to connect to weatehr service", undefined);
        }
        else if (body.error) {
            callback("unabel tof ind locatoin", undefined);
        }
    
        else {
            callback(undefined, {
                temperature: body.current.temperature,
                humidity: body.current.feelslike
            })
         

        }
    });
  }

  module.exports = forecast;