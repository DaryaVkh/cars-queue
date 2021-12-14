import express from 'express';
import * as path from 'path';
import config from './config.json';

const app = express();

app.use(express.static(path.join(__dirname, config.frontendFolder)));

app.use('*', (req, res) => {
    let indexFile = path.resolve(__dirname, config.frontendFolder);
    res.sendFile(indexFile);
});

app.listen(config.serverPort, () => console.log(`Server listening on port ${config.serverPort}!`));

