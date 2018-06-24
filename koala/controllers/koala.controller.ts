import { Router, Request, Response, json } from 'express';
import { AuthDetails } from '../../util/types';

const router : Router = Router();

router.use(json());

router.get('/', (req : Request, res: Response ) : void => {
    res.send('Hello World');
});

router.post('/something', (req : Request, res: Response ) : void => {
    let authDetails : AuthDetails = req.body;
    res.send(authDetails);
});

export const KoalaController : Router = router;
