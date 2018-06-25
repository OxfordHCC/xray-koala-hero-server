import { Router, Request, Response, json } from 'express';
import { AuthDetails } from '../../util/types';
import * as jwt from 'jsonwebtoken';
const config = require('../../config/config');


const router : Router = Router();
router.use(json());

router.get('/', (req : Request, res: Response ) : void => {
    let authDetails : AuthDetails = req.body;
    authenticate(authDetails, (err : jwt.JsonWebTokenError, decoded) => {
        if(err) {
            console.log(err);
            res.status(401).send({error:'invalid token'});
            return;
        }

        // Do whaetever the endpoint do.
        res.send({"authenticated":true});
    });
});

router.post('/phone_info', (req : Request, res: Response ) : void => {
    let authDetails : AuthDetails = req.body;
    authenticate(authDetails, (err : jwt.JsonWebTokenError, decoded) => {
        if(err) {
            console.log(err);
            res.status(401).send({error:'invalid token'});
            return;
        }

        // Do whaetever the endpoint do.
        res.send({"something":"something"});
    });

});

function authenticate(authDetails : AuthDetails, callback : jwt.VerifyCallback) {
    return jwt.verify(authDetails.token, config.auth.secret, { jwtid:authDetails.study_id }, callback);
}

export const KoalaController : Router = router;
