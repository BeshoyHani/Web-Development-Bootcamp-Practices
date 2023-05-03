import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//TODO
const mongoURI = 'mongodb://localhost:27017/wikiDB';
mongoose.connect(mongoURI);

const articleSchema = {
    title: String,
    constent: String
};

const Article = mongoose.model('Article', articleSchema);

app.get('/articles', async (req, res) => {
    const articles = await Article.find();
    res.send(articles);
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});