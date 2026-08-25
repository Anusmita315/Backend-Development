const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// Home route
app.get('/', (req, res) => {
    if (req.session.username) {
        res.send(`
            Welcome back, ${req.session.username}!
            <br><br>
            <a href="/logout">Logout</a>
        `);
    } else {
        res.send(`
            <h2>Login</h2>
            <form action="/login" method="post">
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Enter username"
                    required
                />
                <button type="submit">Login</button>
            </form>
        `);
    }
});

// Login route
app.post('/login', (req, res) => {
    const { username } = req.body;

    req.session.username = username;

    // Create a sample cookie
    res.cookie('theme', 'dark', {
        maxAge: 900000,
        httpOnly: true
    });

    res.redirect('/');
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});