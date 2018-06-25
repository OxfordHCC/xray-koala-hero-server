export class TokenResponse {
    expires:    string = "";
    token:      string = "";
}

export class AuthDetails {
    study_id:      string = "";
    token:      string = "";
}

export class RegistrationDetails {
    study_id:      string = "";
    password:   string = "";
}

export class RegistrationError {
    error:      string = "RegistrationError";
    message:    string = "Error registering user with provided study_id and password.";
}

export class AuthError {
    error:      string = "AuthError";
    message:    string = "Error authenticating user.";
}

export class InsecurePasswordError {
    error:          string = "InsecurePasswordError";
    message:        string = "Password is insecure.";
    insecurities:   PasswordInsecurity[] = [];
}

export abstract class PasswordInsecurity  {
    insecurity: string = "InsecutityType";
    message:    string = "How the password is insecure";
}

export class PasswordTooShort extends PasswordInsecurity {
    constructor() {
        super();
        this.insecurity = "PasswordTooShort";
        this.message = "Password must be of 8 characters in length or longer.";
    }
}

export class PasswordHasNoSpecial extends PasswordInsecurity {
    constructor() {
        super();
        this.insecurity = "PasswordHasNoSpecial";
        this.message = "Password must contain a special character. ($, £, /, {, etc...)";
    }
}

export class PasswordHasNoNumeric extends PasswordInsecurity {
    constructor() {
        super();
        this.insecurity = "PasswordHasNoNumeric";
        this.message = "Password must contain at least one numeric character.";
    }
}

export class User {
    id: number = -1;
    study_id : string = "";
    password_hash : string = "";
    last_auth : Date = new Date();
    date_created : Date = new Date();
}