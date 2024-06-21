const express = require('express');
const path = require('path');
// const { title } = require('process');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>
{
    res.render('index', { title: 'Home', currentPath: '/' });
});

app.get('/products', (req, res) =>
{
    res.render('products', { title: 'Products', currentPath: '/products' });
});

app.get('/about', (req, res) =>
{
    res.render('about', { title: 'About', currentPath: '/about' });
});

app.get('/our-services', (req, res) =>
{
    res.render('our-services', { title: 'Our Services', currentPath: '/our-services' });
});
app.get('/contact-us', (req, res) =>
{
    res.render('contact-us', { title: 'Contact Us', currentPath: '/contact-us' });
});


app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
});