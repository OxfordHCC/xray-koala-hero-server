import * as express from 'express';
import { KoalaController, AuthController } from './controllers';
const config = require('../config/config');

const app: express.Application = express();
const port: number = config.api.port;


app.use('/koala', KoalaController);
app.use('/auth', AuthController);

app.listen(port, () => console.log(`Koala is Listening: http://localhost:${port}`));