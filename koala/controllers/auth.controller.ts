import { Router, Request, Response, json } from 'express';
import { RegistrationDetails, TokenResponse, RegistrationError, User, AuthError, InsecurePasswordError, PasswordTooShort, PasswordHasNoNumeric, PasswordHasNoSpecial, PasswordInsecurity } from '../../util/types';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { DB } from '../../db/db';
const config = require('../../config/config');
const db = new DB(config.roles.koala);

const router : Router = Router();

router.use(json());

router.get('/', (req : Request, res: Response ) : void => {
    res.send('Hello World');
});


/**
 *  Register new User
 */
router.post('/registration', async (req : Request, res: Response ) => {
    let registrationDetails : RegistrationDetails = req.body;


    // Check Valid Email
    if(!validateEmail(registrationDetails.email)) {
        res.send(new RegistrationError());
        return;
    }

    let passwordInsecurities : InsecurePasswordError = getPasswordInsecurities(registrationDetails.password);
    if(passwordInsecurities.insecurities.length != 0) {
        res.send(passwordInsecurities);
        return;
    }

    // Check Email Doesn't Exist
    if(await db.selectByEmail(registrationDetails.email)) {
        console.log(`User already exists with email: ${registrationDetails.email}`);
        res.send(new RegistrationError());
        return;
    }

    let user = new User();
    user.email = registrationDetails.email;

    // Hash the pass.
    let salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(registrationDetails.password, salt);

    user.study_id = registrationDetails.study_id;


    // Insert Details to DB.
    try{
        await db.insertUser(user);
    }
    catch(err) {
        res.send(new RegistrationError());
        return;
    }

    // Generate Token
    let tokenResponse : TokenResponse = createToken(registrationDetails.email);

    // Send Token & Date of Expiry
    res.send(tokenResponse);
});

/**
 * Authenticate an existing user.
 */
router.post('/', async (req : Request, res: Response ) => {
    let registrationDetails : RegistrationDetails = req.body;

    // Check Email Doesn't Exist
    let user : User = await db.selectByEmail(registrationDetails.email);
    if(!user) {
        console.log(`User does not exist with email: ${registrationDetails.email}`);
        res.send(new AuthError());
        return;
    }

    if(!await bcrypt.compare(registrationDetails.password, user.password_hash)) {
        console.log(`Invalid password for user with email: ${registrationDetails.email}`);
        res.send(AuthError);
        return;
    }
        // Generate Token
    let tokenResponse : TokenResponse = createToken(registrationDetails.email);

    res.send(tokenResponse);
});

/**
 * Creates a token using the secret found in the config and the user's email.
 * @param email The email of the user a token is being created for.
 */
function createToken(email : string) : TokenResponse {
    let tokenResponse : TokenResponse = new TokenResponse();

    // create token.
    tokenResponse.token = jwt.sign(
        { email:email},
        config.auth.secret,
        { jwtid:email ,expiresIn:config.auth.expires_in }
    );

    // Calculate Expiry Date
    let expiryDate = new Date(Date.now() +(config.auth.expires_in*1000) );
    tokenResponse.expires = expiryDate.toISOString();

    return tokenResponse;
}

/**
 * Checks if a string is a valid email.
 * @param email The string being checked for validity
 */
function validateEmail(email : string) : boolean {
    const emailRegEx : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(email);
}

/**
 * Password Insecurity checks
 */
function validatePasswordLength(password : string ) {
    return /(?=.{8,})/.test(password);
}
function validatePasswordHasSpecial(password : string) {
    return /(?=.*[^a-zA-Z0-9])/.test(password)
}
function validatePasswordHasNumeric(password : string) {
    return /(?=.*[0-9])/.test(password);
}

/**
 * Builds and returns a InsecurePasswordError from password insecurity checks.
 * @param password Password string that is to be checked for insecurities.
 */
function getPasswordInsecurities(password : string) : InsecurePasswordError {
    let insecurePasswordError : InsecurePasswordError = new InsecurePasswordError();
    if(!validatePasswordLength(password)) {
        insecurePasswordError.insecurities.push(new PasswordTooShort);
    }
    if(!validatePasswordHasNumeric(password)) {
        insecurePasswordError.insecurities.push(new PasswordHasNoNumeric);
    }
    if(!validatePasswordHasSpecial(password)) {
        insecurePasswordError.insecurities.push(new PasswordHasNoSpecial);
    }
    return insecurePasswordError;
}

export const AuthController : Router = router;
