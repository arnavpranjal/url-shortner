declare class signUpDto {
    email: string;
    password: string;
    name: string;
}
export declare class UserController {
    private prisma;
    constructor();
    signUp(signupdto: signUpDto): Promise<{
        message: string;
    }>;
    updatePassword(email: string, password: string): Promise<{
        message: string;
    }>;
}
export {};
