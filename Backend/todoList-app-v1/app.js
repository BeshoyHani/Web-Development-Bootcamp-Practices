import express from 'express';
import { getDate } from './date.js';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

var items = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", (req, res) => {
    const day = getDate();
    res.render('list', { day, listItems: items })
});


app.post('/', (req, res) => {
    let newItem = req.body.newItem;
    items.push(newItem);
    res.redirect('/');
})

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});
