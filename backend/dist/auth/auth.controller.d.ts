import { AuthService } from './auth.service';
declare class signInDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: signInDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
export {};
