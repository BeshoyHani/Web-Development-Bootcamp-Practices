import express from 'express';
import https from 'https';
import path from 'path';

const __direname = path.resolve();
const app = express();


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__direname + '/index.html');
});

app.post('/', (req, res) => {

    const cityName = req.body.cityName;
    const apiKey = '1e24bad873a68d87f0df998d1d8f692e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<p> <strong>The Weather is Currently ${weatherDescription}</strong> </p>`);
            res.write(`
            <div style="display: flex">
                <img src=${imageSrc} />
                <h1> The Temperature in ${city} is <em>${temp}</em> degrees Celcius</h1>
            </div>
            `);
            
            res.send();

        })
    });
})

app.listen(3000, () => {
    console.log('Server listen on port 3000');
});