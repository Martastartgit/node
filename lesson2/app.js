const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const userPath = path.join(__dirname, 'dataUser.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req , res) => {
    res.render('home');
})

app.get('/register', ((req, res) => {
    res.render('register');
}))
app.get('/login', ((req, res) => {
    res.render('login');
}))

app.get('/error', ((req, res) => {
    res.render('error', { msg: 'Email has already been taken'})
}))

app.get('/users', ((req, res) => {
    fs.readFile(userPath,((err, data) => {
        if (err){
            console.log(err);
            return err;
        }
        let users = JSON.parse(data.toString());
        res.render('users', {users});
    }))

}))

app.get('/users/:userId', ((req, res) => {
    fs.readFile(userPath, ((err, data) => {
        if (err){
            console.log(err);
            return err;
        }
        const {userId} = req.params;
        let users = JSON.parse(data.toString());
        res.render('user', {user : users[userId]});
    }))

}))


app.post('/register', ((req, res) => {
    fs.readFile(userPath,  (err, data) => {
        if (err){
            console.log(err);
            return err;
        }
        const {name, email, password} = req.body;
        const newUser =  {
            name : name,
            email: email,
            password: password
        }
        if (Object.entries(data).length) {
            let users = JSON.parse(data);
            let findUser = users.find(item => item.email === email);
            if  (!findUser) {
                users.push(newUser)
                fs.writeFile(userPath, JSON.stringify(users), err => err)
                res.redirect('/users');
                return
            }
            res.redirect('/error');
            return
        }
        fs.writeFile(userPath, JSON.stringify([newUser]), err => err);
        res.redirect('/users');

    })

}))

app.post('/login', ((req, res) => {
    fs.readFile(userPath,  (err, data) => {
        if (err){
            console.log(err);
            return err;
        }
        const { email, password } = req.body;
        let users = JSON.parse(data);
        let findUser = users.find(item => item.email === email && item.password === password);
        if (findUser) {
            res.redirect(`/users/${users.indexOf(findUser)}`);
            return
        }
        res.status(404).send('“Incorrect user email or password')
    })
}))

app.listen(5000, ()=> console.log('App listen 5000'))

