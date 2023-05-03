import express from 'express';
import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';
import bcrypt from "bcrypt";
import md5 from 'md5';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const mongoURI = 'mongodb://localhost:27017/userDB';

mongoose.connect(mongoURI);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

//userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

const User = new mongoose.model('User', userSchema);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
});

app.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ email: username });
        const hash = await bcrypt.hash(password, process.env.SALT_ROUNDS);
        if (user && user.password === hash) {
            res.render('secrets');
        } else {
            res.redirect('login');
        }
    });

app.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post(async (req, res) => {
        const hash = await bcrypt.hash(req.body.password, +process.env.SALT_ROUNDS);
        const userInfo = {
            email: req.body.username,
            password: hash
        };
        const user = new User(userInfo);
        await user.save();
        res.render('login');

    });

app.listen(PORT, () => {
    console.log('Server Started');
});