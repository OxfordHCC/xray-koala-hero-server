export class TokenResponse {
    expires:    string = "";
    token:      string = "";
}

export class AuthDetails {
    email:      string = "";
    token:      string = "";
}

export class RegistrationDetails {
    email:      string = "";
    password:   string = "";
}

export class RegistrationError {
    error:      string = "RegistrationError";
    message:    string = "Error registering user with provided email and password.";
}

export class AuthError {
    error:      string = "AuthError";
    message:    string = "Error authenticating user.";    
}

export class User {
    id: number = -1;
    email : string = "";
    hashed_password : string = "";
    last_auth : Date = new Date();
    date_created : Date = new Date(); 
}