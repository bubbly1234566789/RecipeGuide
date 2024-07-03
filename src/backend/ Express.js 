const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Recipe = require('./models/Recipe');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/recipeguide', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) return done(err);
                if (res === false) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        })
        .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

app.use(require('express-session')({
    secret: 'recipeguide secret key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

app.post('/api/login', passport.authenticate('local', { failureRedirect: '/api/login' }), (req, res) => {
    res.json(req.user);
});

app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/api/recipes', async (req, res) => {
    const { user } = req.query;
    try {
        const recipes = await Recipe.find({ user });
        res.json(recipes);
    } catch (error) {
        res.status(500).send('Error fetching recipes');
    }
});

app.get('/api/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).send('Error fetching recipe');
    }
});

app.post('/api/recipes', async (req, res) => {
    const { title, ingredients, instructions, image, user } = req.body;
    try {
        const newRecipe = new Recipe({ title, ingredients, instructions, image, user });
        await newRecipe.save();
        res.status(201).send('Recipe created successfully');
    } catch (error) {
        res.status(500).send('Error creating recipe');
    }
});

app.put('/api/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, ingredients, instructions, image } = req.body;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, { title, ingredients, instructions, image }, { new: true });
        if (!updatedRecipe) {
            return res.status(404).send('Recipe not found');
        }
        res.status(200).send('Recipe updated successfully');
    } catch (error) {
        res.status(500).send('Error updating recipe');
    }
});

app.delete('/api/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).send('Recipe not found');
        }
        res.status(200).send('Recipe deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting recipe');
    }
});

app.get('/api/recipes/search', async (req, res) => {
    const { ingredients } = req.query;
    const regex = new RegExp(ingredients, 'i');
    try {
        const recipes = await Recipe.find({ ingredients: { $regex: regex } });
        res.json(recipes);
    } catch (error) {
        res.status(500).send('Error searching recipes');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
