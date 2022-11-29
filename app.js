const express = require('express');
const mongoose = require('mongoose');
mongoose
    .connect('mongodb+srv://vijaythakur:vijaythakur@cluster0.xdtrm.mongodb.net/photozone?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then((c) => {
        console.log(`Mongodb connect to: ${c.connection.host}`);
    })
    .catch((e) => {
        console.log(e);
    });

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    price: String,
    function: String,
    date: String,
    message: String
})

const Contact = mongoose.model('Contact', contactSchema);
const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
})

app.post("/form", async (req, res) => {
    console.log(req.body);
    const contact = new Contact(req.body);
    await contact.save()
    res.redirect('/form');

})

app.listen(port, () => {
    console.log(`Server is running on port: ${port} `);
});