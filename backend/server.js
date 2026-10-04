const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting (Spam theke bachar jonno)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 requests per 15 mins from same IP
    message: { message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/booking', limiter);

// Nodemailer Transporter Setup (Apnar mail credentials ekhane dite hobe)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'miskatultaksim@gmail.com',       // Apnar email ekhane deben
        pass: 'aado cwsh hapx ryjc'     // Apnar Gmail App Password ekhane deben
    }
});

// Booking API Endpoint
app.post('/api/booking', async (req, res) => {
    try {
        const { name, phone, service } = req.body;

        // Validation
        if (!name || !phone || !service) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Email options
        const mailOptions = {
            from: 'miskatultaksim@gmail.com',
            to: 'info@bsfm.ae', // Website er official mail
            subject: `New Booking Request from ${name}`,
            text: `You have a new booking request:\n\nName: ${name}\nPhone: ${phone}\nService: ${service}`
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Booking received and email sent successfully!' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});