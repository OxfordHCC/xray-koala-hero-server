import { AuthController } from '../koala/controllers/auth.controller';
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
    email : string = "";
    password_hash : string = "";
    last_auth : Date = new Date();
    date_created : Date = new Date();
}

export class PhoneInformation {
    id : number = -1;
    study_id : string = ""
    retrieval_datetime : Date = new Date();
    installed_apps : string[] = [];
    top_ten_apps : string [] = [];
}

export class Interaction {
    id : number = -1;
    study_id : string = "";
    interaction_type : string = "";
    interaction_datetime : Date = new Date();
    associated_app_id : string = "";
    page_name : string = "";
    additional_data : any = {};
}

export class LogInteractionRequest {
    auth_details : AuthDetails = new AuthDetails();
    interaction : Interaction = new Interaction();
}

export class LogPhoneInformationRequest {
    auth_details : AuthDetails = new AuthDetails();
    phone_info : PhoneInformation = new PhoneInformation();
}

export class AudioInformation {
    study_id : String = "";
    file_id : number = -1;
    date : Date = new Date();
    file_size : number = -1;
    length : number = -1;
    file_data : ByteString = "";
    file_path : string = "";
}

export class LogAudioRequest {
    auth_details : AuthDetails = new AuthDetails();
    audio_info : AudioInformation = new AudioInformation();
}