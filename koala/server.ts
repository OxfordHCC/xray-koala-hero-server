import * as express from 'express';
import { KoalaController } from './controllers';

const config = require('../config/config.json');

const app: express.Application = express();
const port: number = config.api.port;


app.use('/', KoalaController);

app.listen(port, () => console.log(`Koala is Listening: http://localhost:${port}`));