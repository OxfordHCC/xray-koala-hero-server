import { Router, Request, Response, json } from 'express';
import { AuthRequest, RegistrationDetails, TokenResponse } from '../../util/types';
import { sign } from 'jsonwebtoken';
import { hashSync } from 'bcryptjs';
const config = require('../../config/config');

const router : Router = Router();

router.use(json());

router.get('/', (req : Request, res: Response ) : void => {
    res.send('Hello World');
});

router.post('/registration', (req : Request, res: Response ) : void => {
    let registrationDetails : RegistrationDetails = req.body;
    registrationDetails.password = hashSync(registrationDetails.password);


    // Check Valid Email

        // Send RegistrationError if email is invalid.


    // Check Email Doesn't Exist

        // Send RegistrationError if email already in use.


    // Insert Details to DB.

        // Send RegistrationError if fail to insert to DB.


    // Generate Token
    let tokenResponse : TokenResponse = createToken(registrationDetails.email);
    
    // Send Token & Date of Expiry
    res.send(tokenResponse);
});

router.post('/', (req : Request, res: Response ) : void => {
    let authRequest : AuthRequest = req.body;
    
    // Check if user email in DB

        // Send AuthError if user email not found
        
        
    // Check if password matches the hashed password.

        // Send AuthError if password not correct.

    
    
    res.send(authRequest);
});

function createToken(email : string) : TokenResponse {
    let tokenResponse : TokenResponse = new TokenResponse(); 

    // create token.
    tokenResponse.token = sign(
        { id:email},
        config.auth.secret,
        { expiresIn:config.auth.expires_in }
    );

    // Calculate Expiry Date
    let expiryDate = new Date(Date.now() +(config.auth.expires_in*1000) );
    tokenResponse.expires = expiryDate.toISOString();

    return tokenResponse;
}

export const AuthController : Router = router;
