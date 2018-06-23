import { Router, Request, Response, json } from 'express';
import { AuthRequest } from '../../util/types';

const router : Router = Router();

router.use(json());

router.get('/', (req : Request, res: Response ) : void => {
    res.send('Hello World');
});

router.post('/auth', (req : Request, res: Response ) : void => {

    let authRequest : AuthRequest = req.body;
    res.send(authRequest);
});

export const KoalaController : Router = router;
