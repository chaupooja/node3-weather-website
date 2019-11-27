const request= require('request')

const forecast =(latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/65013a7bd347a52bb4bb8b09f8b85905/'+latitude+','+longitude

    request({ url, json: true },( error, {body} )=>{
        if (error){
            callback('Unable to connect to location service!', undefined)
        }else if(body.error){
            callback('Unable to find the location. Try another search.',undefined)
        }else{
            callback(undefined,(' The Temperature is high at '+body.daily.data[0].temperatureHigh+'. The Low is at '+body.daily.data[0].temperatureLow+'. '+body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degree out. There is a '+body.currently.precipProbability+'% chance of rain.'))
        }

    })

}
module.exports=forecast