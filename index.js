const { response } = require('express');

const express = require('express');
const fileupload = require('express-fileupload')

const glassesRoutes = require('./routes/glasses');

const errorController = require('./controllers/error');

const app = express();

const port = process.env.PORT || 3003;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/', glassesRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(port, () => console.log(`listening on port ${port}`));
