import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(express.urlencoded({extended: true}));


app.get('/', (_req, res) => {
    res.sendFile(__dirname+ '/index.html');
})

app.post('/calculator', (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const bmi = weight / (height * height);
    res.send('Your BMI is ' + bmi);
})


app.listen(3000, () => {
    console.log('server started')
})