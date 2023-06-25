const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    if (pathName.includes('documentation.html')) {
        fs.readFile('documentaiton.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }

const log = '${new.url} - ${new Date().toISOString()}\n';
fs.append.File('log.txt', log, (err) => {
    if (err) {
        console.error('Error appending to log file:', err);
    }
});

const port = 8080;
server.listen(port, () => {
    console.log('My first Node test server is running on ${port}');
});