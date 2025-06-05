import express from 'express';
import { Php, Request } from '@platformatic/php-node';
import path from 'path';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const php = new Php({ docroot: path.resolve('./php') });

app.post('/run', async (req, res) => {
    try {
        const code = req.body.code;

        const request = new Request({
            method: 'POST',
            url: 'http://localhost/index.php',
            headers: { 'Content-Type': ['application/x-www-form-urlencoded'] },
            body: Buffer.from(`code=${encodeURIComponent(code)}`)
        });

        const response = await php.handleRequest(request);

        res.send(response.body.toString());  // send plain output only
    } catch (err) {
        console.error('Error handling PHP request:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});

process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
});
