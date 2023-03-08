const path = require('path')
const express = require ('express');
const app = express();
const port = process.env.PORT || 3000
const hbs = require('hbs');
const request = require('request');
// load in local files
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname,'../public');
const partialsPath = path.join(__dirname, '../templates/partials');
//set up handlebars engine and views location
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
app.set('views', viewsPath);
// setup static directory to serve to client
app.use(express.static(publicDirectoryPath));

// handle get request
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Christian Malpass'
    })
})
app.get('/about', (req, res) => {
   res.render('about', {
    title:'About Page',
    name:'Christian Malpass'
   })
})
app.get('/help', (req, res) => {
    res.render('help', {
     message: 'this is the help page',
     title: 'Help',
     name: 'Christian Malpass'
    })
 })
app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return  res.send({
            errorMessage: 'No address provided'
        })
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return  res.send({
                errorMessage: error
            })
        }
        // console.log('Weather in ' + location + ": ");
        forecast(latitude, longitude, (error, {temperature, humidity} = {}) => {
            if(error) {
                return  res.send({
                    errorMessage: 'Unable to find weather'
                })
            }
            // console.log( "It's currently", temperature, 'degrees out. It feels like' , humidity, 'degrees out.');
            res.send({
                location,
                temperature,
                humidity

            })
           });
         
          
    })

})
app.get('/help/*', (req, res) => {
    res.render('notFound', {
        errorMessage: 'Help page not found'
    })
})
app.get('/products', (req, res) => {
    console.log(req.query);
    if(!req.query.search) {
        res.send({
            error: 'You must proviede a search term'
        })

    }
    else {
        res.send({
            products: []
        })

    }


})
app.get('*', (req, res) => {
    res.render('notFound', {
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=> {
    console.log("server is up on port 3000");
})