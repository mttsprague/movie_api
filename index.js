const express = require('express');
    app = express(),
    bodyParser = require('body-parser');
    uuid = require('uuid');

app.use(bodyParser.json());

app.use ((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

let users = [
    {
        id: 1,
        name: "Matt",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Rachel",
        favoriteMovies: ["The Departed"]
    },
]

let movies = [
    {
        "Title":"Top Gun: Maverick",
        "Description":"After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
        "Genre": {
            "Name":"Drama",
            "Description":"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone",
        },
        "Director": {
            "Name":"Joseph Kosinski",
            "Bio":"Joseph Kosinski is a director whose uncompromising style has quickly made a mark in the filmmaking zeitgeist. His four theatrical releases have grossed $2.2 billion worldwide and been nominated for 7 Academy Awards and 2 Grammys.",
            "Birth":1974.0
        },
        "ImageURL":"https://www.imdb.com/title/tt1745960/mediaviewer/rm3294367489/?ref_=tt_ov_i",
        "Featured":false
    },
    {
        "Title":"The Departed",
        "Description":"An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
        "Genre": {
            "Name":"Drama",
            "Description":"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone",
        },
        "Director": {
            "Name":"Martin Scorsese",
            "Bio":"Martin Charles Scorsese was born on November 17, 1942 in Queens, New York City, to Catherine Scorsese (née Cappa) and Charles Scorsese, who both worked in Manhattan's garment district, and whose families both came from Palermo, Sicily. He was raised in the neighborhood of Little Italy, which later provided the inspiration for several of his films. Scorsese earned a B.S. degree in film communications in 1964, followed by an M.A. in the same field in 1966 at New York University's School of Film. During this time, he made numerous prize-winning short films including The Big Shave (1967), and directed his first feature film, Who's That Knocking at My Door (1967).",
            "Birth":1942.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0407887/mediaviewer/rm981113088/?ref_=tt_ov_i",
        "Featured":false
    },
    {
        "Title":"The Shawshank Redemption",
        "Description":"Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
        "Genre": {
            "Name":"Drama",
            "Description":"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone",
        },
        "Director": {
            "Name":"Frank Darabont",
            "Bio":"Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Brought to America as an infant, he settled with his family in Los Angeles and attended Hollywood High School.",
            "Birth":1959.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0111161/mediaviewer/rm1690056449/?ref_=tt_ov_i",
        "Featured":false
    },
];

//CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
})

//UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

//CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})

//DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})

//DELETE
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter (user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no such user')
    }
})

//READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

//READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
})

//READ
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
})

//READ
app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
})


app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

