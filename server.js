const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

let transporter;
try
{
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Verify the connection configuration
    transporter.verify(function (error, success)
    {
        if (error)
        {
            console.log('SMTP connection error:', error);
        } else
        {
            console.log('Server is ready to take our messages');
        }
    });
} catch (error)
{
    console.error('Error creating transporter:', error);
}

app.post('/send-enquiry', (req, res) =>
{
    const { name, company, country, email, enquiry } = req.body;

    if (!name || !company || !country || !email || !enquiry)
    {
        return res.status(400).send('All fields are required.');
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'ravindra5555raj@gmail.com',
        subject: `Customer Enquiry from ${name}`,
        text: `Name: ${name}\nCompany: ${company}\nCountry: ${country}\nEmail: ${email}\n\nEnquiry:\n${enquiry}`,
    };

    transporter.sendMail(mailOptions, (error, info) =>
    {
        if (error)
        {
            console.error('Detailed send error:', error);
            return res.status(500).send('Error sending email: ' + error.message);
        }
        console.log('Email sent:', info.response);
        res.send('Enquiry sent successfully!');
    });
});

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
});
