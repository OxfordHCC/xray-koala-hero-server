import { Router, Request, Response, json } from 'express';
import { AuthDetails, LogInteractionRequest, LogPhoneInformationRequest, LogAudioRequest } from '../../util/types';
import * as jwt from 'jsonwebtoken';

const config = require('../../config/config');

import { DB } from '../../db/db';
const db = new DB(config.roles.koala);

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

router.post('/audio',  (req : Request, res : Response) => {
    let logAudioRequest : LogAudioRequest = req.body;
    console.log(`Audio Log Request.`);
    authenticate(logAudioRequest.auth_details, async (err : jwt.JsonWebTokenError, decoded) => {
        console.log(`Authenticated Audio Log Request for partcipant: ${logAudioRequest.audio_info.study_id}`);
        if(err) {
            console.log(err);
            res.status(401).send({error:'invalid token'});
            return;
        }

        try{
            await db.saveAudioFile(logAudioRequest.audio_info);
            res.status(200).send({Success:"Audio was successfully logged."});
        }
        catch(err) {
            console.log(`Error processing Audio Request: ${err}`);
            res.status(400).send({Error:err});
        }
            // Do whaetever the endpoint do.
    });
});

router.post('/interaction', (req : Request, res: Response ) => {
    let logInteractionRequest : LogInteractionRequest = req.body;
    authenticate(logInteractionRequest.auth_details, async (err : jwt.JsonWebTokenError, decoded) => {
        if(err) {
            console.log(err);
            res.status(401).send({error:'invalid token'});
            return;
        }

        try{
            await db.insertInteractionLog(logInteractionRequest.interaction);
            res.status(200).send({success:"Interaction was successfully logged."});
        }
        catch(err) {
            res.status(400).send({Error:err});
        }
            // Do whaetever the endpoint do.
    });
});

router.post('/phone_info', (req : Request, res: Response ) => {
    let logPhoneInformationRequest : LogPhoneInformationRequest = req.body;
    console.log(logPhoneInformationRequest);
    authenticate(logPhoneInformationRequest.auth_details, async (err : jwt.JsonWebTokenError, decoded) => {
        if(err) {
            console.log(err);
            res.status(401).send({error:'invalid token'});
            return;
        }

        try{
            await db.insertPhoneInfo(logPhoneInformationRequest.phone_info);
            res.status(200).send({Success:"Interaction was successfully logged."});
        }
        catch(err) {
            res.status(400).send({Error:err});
        }
            // Do whaetever the endpoint do.
    });
});

function authenticate(authDetails : AuthDetails, callback : jwt.VerifyCallback) {
    return jwt.verify(authDetails.token, config.auth.secret, { jwtid:authDetails.email }, callback);
}

export const KoalaController : Router = router;
