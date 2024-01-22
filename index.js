const express = require('express');
morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [
    {
        title: 'Top Gun',
    },
    {
        title: 'Shawshank Redemption',
    },
    {
        title: 'Avengers',
    },
];

app.get('/', (req, res) => {
    res.send('Welcome to my movie collection!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: movie_api});
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

app.use(express.static('documentation.html'));

